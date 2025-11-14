"use client"
import { useState, useCallback } from 'react';


export interface CSVValidationResult {
    isValid: boolean;
    errors: string[];
    headers: string[];
    data?: string[][];
}

export const useCSVValidator = (requiredHeaders: string[], optionalHeaders: string[] = []) => {
    const [validationResult, setValidationResult] = useState<CSVValidationResult | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const validateHeaders = useCallback((headers: string[]): Omit<CSVValidationResult, 'data'> => {
        const errors: string[] = [];
        const normalizedHeaders = headers.map(header => header.trim().toLowerCase());
        const normalizedRequired = requiredHeaders.map(header => header.trim().toLowerCase());
        const normalizedOptional = optionalHeaders.map(header => header.trim().toLowerCase());

        // Check for required headers
        normalizedRequired.forEach(requiredHeader => {
            if (!normalizedHeaders.includes(requiredHeader)) {
                errors.push(`Missing required header: ${requiredHeader}`);
            }
        });

        // Check for duplicate headers
        const headerCount: { [key: string]: number } = {};
        headers.forEach(header => {
            const normalized = header.trim().toLowerCase();
            headerCount[normalized] = (headerCount[normalized] || 0) + 1;
        });

        Object.entries(headerCount).forEach(([header, count]) => {
            if (count > 1) {
                errors.push(`Duplicate header found: ${header}`);
            }
        });

        // Check for invalid headers (headers that are neither required nor optional)
        normalizedHeaders.forEach(header => {
            if (!normalizedRequired.includes(header) && !normalizedOptional.includes(header)) {
                errors.push(`Invalid header found: ${header}`);
            }
        });

        return {
            isValid: errors.length === 0,
            errors,
            headers: normalizedHeaders
        };
    }, [requiredHeaders, optionalHeaders]);

    const parseCSV = useCallback((csvText: string): string[][] => {
        const lines = csvText.split('\n').filter(line => line.trim());

        return lines.map(line => {
            const result: string[] = [];
            let current = '';
            let inQuotes = false;

            for (let i = 0; i < line.length; i++) {
                const char = line[i];

                if (char === '"') {
                    inQuotes = !inQuotes;
                } else if (char === ',' && !inQuotes) {
                    result.push(current.trim().replace(/^"|"$/g, ''));
                    current = '';
                } else {
                    current += char;
                }
            }

            result.push(current.trim().replace(/^"|"$/g, ''));
            return result;
        });
    }, []);

    const processCSVFile = useCallback(async (file: File ): Promise<CSVValidationResult> => {
        setIsProcessing(true);

        try {
            const text = await readFileAsText(file);
            const rows = parseCSV(text);

            if (rows.length === 0) {
                return {
                    isValid: false,
                    errors: ['CSV file is empty'],
                    headers: [],
                    data: []
                };
            }

            const headers = rows[0];
            const data = rows.slice(1); // Exclude header row
            const validation = validateHeaders(headers);

            const result: CSVValidationResult = {
                ...validation,
                data
            };

            setValidationResult(result);
            return result;

        } catch (error) {
            const errorResult: CSVValidationResult = {
                isValid: false,
                errors: ['Error reading file'],
                headers: [],
                data: []
            };
            setValidationResult(errorResult);
            return errorResult;
        } finally {
            setIsProcessing(false);
        }
    }, [parseCSV, validateHeaders]);

    const resetValidation = useCallback(() => {
        setValidationResult(null);
    }, []);

    return {
        validationResult,
        isProcessing,
        processCSVFile,
        resetValidation,
        validateHeaders
    };
};

const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = reject;
        reader.readAsText(file);
    });
};
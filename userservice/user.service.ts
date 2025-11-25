import { CookieHelper } from "@/helper/cookie.helper";
import { Fetch } from "@/lib/Fetch";

const config = {
    headers: {
        "Content-Type": "application/json",
    },
};

type salesFilterState = {
    email: string[];
    job_title: string[];
    company_domain: string[];
    urls: string[];
    city: string[];
    email_first: string[];
    email_second: string[];
};

type zoominfoFilterState = {
    email: string[];
    lead_titles: string[];
    company_website: string[];
    company_industry: string[];
    company_size: string[];
    revenue_range: string[];
    company_location_text: string[];
    keyword: string[];
};
type apolloFilterState = {
    email: string[];
    job_titles: string[];
    industry: string[];
    keyword: string[];
    technologies: string[];
    website: string[];
    company_domain: string[];
    company_linkedin: string[];
    country: string[];
    city: string[];
    state: string[];
    min_annual_revenue: string;
    max_annual_revenue: string;
    min_employee: string;
    max_employee: string;
};

export const UserService = {
    login: async ({ email, password }: { email: string, password: string }, context = null) => {
        // const userToken = CookieHelper.get({ key: "token", context });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        return await Fetch.post(`/auth/login`, { email: email, password: password }, config);
    },

    me: async () => {
        const userToken = CookieHelper.get({ key: "access_token" });
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            },
        };
        return await Fetch.get('/auth/me', config);
    },

    logout: async (id: string) => {
        const userToken = CookieHelper.get({ key: "token" });
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: userToken,
            },
        };
        return await Fetch.post('/logout', { userid: id }, config);
    },
    getFilters: async ({ filter, search }: { filter: string, search?: string }) => {
        const userToken = CookieHelper.get({ key: "token" });
        const config = {
            headers: {
                "Content-Type": "application/json",
                // Authorization: userToken,
            },
        };
        if (filter === 'jobTitles') {
            return await Fetch.get(`/leads/job_title?search=${search}`, config);
        }
        if (filter === 'domains') {
            return await Fetch.get(`/leads/company_domain?search=${search}`, config);
        }
        if (filter === 'personalLinkedin') {
            return await Fetch.get(`/leads/linkedin_id?search=${search}`, config);
        }
        if (filter === 'location') {
            return await Fetch.get(`/leads/city2?search=${search}`, config);
        }
        if (filter === 'emailFirst') {
            return await Fetch.get(`/leads/email_first?search=${search}`, config);
        }
        if (filter === 'emailSecond') {
            return await Fetch.get(`/leads/email_second?search=${search}`, config);
        }
        if (filter === 'lead_titles') {
            return await Fetch.get(`/leads/lead_titles?search=${search}`, config);
        }
        if (filter === 'industry') {
            return await Fetch.get(`/leads/company_industry?search=${search}`, config);
        }
        if (filter === 'keywords') {
            return await Fetch.get(`/leads/skills?search=${search}`, config);
        }
        if (filter === 'company_website') {
            return await Fetch.get(`/leads/company_website?search=${search}`, config);
        }
        if (filter === 'companyRevenue') {
            return await Fetch.get(`/leads/revenue_range?search=${search}`, config);
        }
        if (filter === 'employeeSize') {
            return await Fetch.get(`/leads/company_size?search=${search}`, config);
        }
        if (filter === 'company_location') {
            return await Fetch.get(`/leads/company_location_text?search=${search}`, config);
        }
        if (filter === 'industries') {
            return await Fetch.get(`/leads/industry?search=${search}`, config);
        }
        if (filter === 'keyword') {
            return await Fetch.get(`/leads/keyword?search=${search}`, config);
        }
        if (filter === 'technologies') {
            return await Fetch.get(`/leads/technologies?search=${search}`, config);
        }
        if (filter === 'websites') {
            return await Fetch.get(`/leads/website?search=${search}`, config);
        }
        if (filter === 'company_domain') {
            return await Fetch.get(`/leads/website?search=${search}`, config);
        }
        if (filter === 'companyLinkedin') {
            return await Fetch.get(`/leads/company_linkedin?search=${search}`, config);
        }
        if (filter === 'countries') {
            return await Fetch.get(`/leads/country?search=${search}`, config);
        }
        if (filter === 'cities') {
            return await Fetch.get(`/leads/city?search=${search}`, config);
        }
        if (filter === 'states') {
            return await Fetch.get(`/leads/state?search=${search}`, config);
        }
    },
    getFilteredSalesData: async ({ search, page, limit, filters }: { search?: string, page: number, limit: number, filters: salesFilterState }) => {
        const userToken = CookieHelper.get({ key: "access_token" });
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            },
        };
        let filter = "";
        Object.entries(filters).forEach(item => {
            item[1]?.forEach(entry => {
                if (entry) {
                    filter += `${item[0]}=${entry?.trim()}&`;
                }
            })
        });
        if (filter.endsWith('&')) {
            filter = filter.slice(0, -1);
        }
        return await Fetch.get(`/leads/sales-navigator?page=${page}&limit=${limit}&q=${search || ""}&${filter}`, config);
    },
    getFilteredZoominfoData: async ({ search, page, limit, filters }: { search?: string, page: number, limit: number, filters: zoominfoFilterState }) => {
        const userToken = CookieHelper.get({ key: "access_token" });
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            },
        };

        let filter = "";
        Object.entries(filters).forEach(item => {
            item[1]?.forEach(entry => {
                if (entry) {
                    filter += `${item[0]}=${entry?.trim()}&`;
                }
            })
        });
        if (filter.endsWith('&')) {
            filter = filter.slice(0, -1);
        }

        return await Fetch.get(`/leads/zoominfo?page=${page}&limit=${limit}&q=${search || ""}&${filter}`, config);
    },
    getFilteredApolloData: async ({ search, page, limit, filters }: { search?: string, page: number, limit: number, filters: apolloFilterState }) => {
        const userToken = CookieHelper.get({ key: "access_token" });
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            },
        };

        let filter = "";
        Object.entries(filters).forEach(item => {
            if (Array.isArray(item[1])) {
                item[1]?.forEach(entry => {
                    if (entry) {
                        filter += `${item[0]}=${entry?.trim()}&`;
                    }
                })
            } else {
                if (Number(item[1]) > 0) {
                    filter += `${item[0]}=${item[1]?.trim()}&`;
                }
            }
        });
        if (filter.endsWith('&')) {
            filter = filter.slice(0, -1);
        }

        return await Fetch.get(`/leads/apollo?page=${page}&limit=${limit}&q=${search || ""}&${filter}`, config);
    },


    importCSVdata: async (data: any) => {
        const userToken = CookieHelper.get({ key: "access_token" });
        const config = {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        };
        return await Fetch.post('/leads/import', data, config);
    },

    getExportData: async (page: number, limit: number, filterType: string, filters: apolloFilterState | salesFilterState | zoominfoFilterState) => {
        const userToken = CookieHelper.get({ key: "access_token" });
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            },
        };

        let filter = "";
        Object.entries(filters).forEach(item => {
            if (Array.isArray(item[1])) {
                item[1]?.forEach(entry => {
                    if (entry) {
                        filter += `${item[0]}=${entry?.trim()}&`;
                    }
                })
            } else {
                filter += `${item[0]} = ${item[1]}`
            }
        })
        if (filter.endsWith('&')) {
            filter = filter.slice(0, -1);
        }

        if (filterType === "sells") {
            return await Fetch.get(`/leads/sales-navigator?page=${page}&limit=${limit}&${filter}`, config);
        }
        if (filterType === "zoominfo") {
            return await Fetch.get(`/leads/zoominfo?page=${page}&limit=${limit}&${filter}`, config);
        }
        if (filterType === "apollo") {
            return await Fetch.get(`/leads/apollo?page=${page}&limit=${limit}&${filter}`, config);
        }
    },
    deleteData: async({data}:{data:{type:string;startDate:string;endDate:string}})=>{
        const userToken = CookieHelper.get({ key: "access_token" });
        const config = {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
            data
        };
        if(data.type==="APOLLO")
        return await Fetch.delete(`/leads/apollo/delete?startDate=${data?.startDate}&endDate=${data?.endDate}`, config);
        if(data.type==="ZOOMINFO")
        return await Fetch.delete(`/leads/zoominfo/delete?startDate=${data?.startDate}&endDate=${data?.endDate}`, config); 
        if(data.type==="SALES_NAVIGATOR")
        return await Fetch.delete(`/leads/sales-navigator/delete?startDate=${data?.startDate}&endDate=${data?.endDate}`, config);
    },
    sendResetOTP: async({email}:{email: string})=>{
        return await Fetch.post('/auth/forgot-password', {email});
    },
    
    resetPassword: async({email, otp, password}:{email: string, otp: string, password: string})=>{
        return await Fetch.post('/auth/reset-password', {email, token:otp, password});
    },

}
// userservice/user.service.ts
export const UserService = {
  // For Server Components
  getDigitalTimesheetServer: async () => {
    const baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT;
    
    const response = await fetch(`${baseURL}/digitalTimesheet`, {
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 60 // This will work now
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch digital timesheet');
    }

    return response.json();
  },
}
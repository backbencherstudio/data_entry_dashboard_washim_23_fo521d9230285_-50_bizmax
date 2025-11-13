import { CookieHelper } from "@/helper/cookie.helper";
import { Fetch } from "@/lib/Fetch";

const config = {
    headers: {
        "Content-Type": "application/json",
    },
};

export const UserService = {
    login: async ({ email, password }: { email: string, password: string }, context = null) => {
        // const userToken = CookieHelper.get({ key: "token", context });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        return await Fetch.post(`/login`, { email: email, password: password }, config);
    },

    me: async () => {
        const userToken = CookieHelper.get({ key: "token" });
        const config = {
            headers: {
                "Content-Type": "application/json",
                // Authorization: userToken,
            },
        };
        return await Fetch.get('/me', config);
    },

    logout: async (id: string) => {
        console.log("User id : ", id)
        const userToken = CookieHelper.get({ key: "token" });
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: userToken,
            },
        };
        return await Fetch.post('/logout', { userid: id }, config);
    },
    getFilters: async ({filter,search}:{filter:string,search?:string}) => {
        const userToken = CookieHelper.get({ key: "token" });
        const config = {
            headers: {
                "Content-Type": "application/json",
                // Authorization: userToken,
            },
        };
        if(filter === 'jobTitles'){
            return await Fetch.get(`/leads/job_title?search=${search}`, config);
        }
        if(filter === 'domains'){
            return await Fetch.get(`/leads/company_domain?search=${search}`, config);
        }
        if(filter === 'personalLinkedin'){
            return await Fetch.get(`/leads/linkedin_id?search=${search}`, config);
        }
        if(filter === 'location'){
            return await Fetch.get(`/leads/city2?search=${search}`, config);
        }
        if(filter === 'emailFirst'){
            return await Fetch.get(`/leads/email_first?search=${search}`, config);
        }
        if(filter === 'emailSecond'){
            return await Fetch.get(`/leads/email_second?search=${search}`, config);
        }
        if(filter === 'lead_titles'){
            return await Fetch.get(`/leads/lead_titles?search=${search}`, config);
        }
        if(filter === 'industry'){
            return await Fetch.get(`/leads/company_industry?search=${search}`, config);
        }
        if(filter === 'keywords'){
            return await Fetch.get(`/leads/skills?search=${search}`, config);
        }
        if(filter === 'company_website'){
            return await Fetch.get(`/leads/company_website?search=${search}`, config);
        }
        if(filter === 'companyRevenue'){
            return await Fetch.get(`/leads/revenue_range?search=${search}`, config);
        }
        if(filter === 'employeeSize'){
            return await Fetch.get(`/leads/company_size?search=${search}`, config);
        }
        if(filter === 'company_location'){
            return await Fetch.get(`/leads/company_location_text?search=${search}`, config);
        }
    },
    getFilteredSalesData: async({search,page,limit}:{search?:string,page:number,limit:number})=>{
        const userToken = CookieHelper.get({ key: "token" });
        const config = {
            headers: {
                "Content-Type": "application/json",
                // Authorization: userToken,
            },
        };
        return await Fetch.get(`/leads/sales-navigator?page=${page}&limit=${limit}&search=${search ||""}`, config);
    },
    getFilteredZoominfoData: async({search,page,limit}:{search?:string,page:number,limit:number})=>{
        const userToken = CookieHelper.get({ key: "token" });
        const config = {
            headers: {
                "Content-Type": "application/json",
                // Authorization: userToken,
            },
        };
        return await Fetch.get(`/leads/zoominfo?page=${page}&limit=${limit}&search=${search ||""}`, config);
    }
}
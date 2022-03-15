import API from './Api'

const LinkingService = {
    linkRetailer: async (args) => {
        const data = await API.post("wp-json/api/wbs-link-existing-retailer-mobile",args)
        return data
    },
    linkUserNamePassword: async (args) => {
        const data = await API.post("wp-json/api/existing-account-verification-mobile",args)
        return data
    }
}

export default LinkingService
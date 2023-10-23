import axios from "axios"

const BASE_URL = "http://localhost:5000"

export const getAllAgents = async () => {
	try {
		const { data } = await axios.get( BASE_URL + "/api/agents/")
		return data
	} catch (error) {
		alert("Something went wrong.")
	}
}

export const createNewAgent = async (newAgent) => {
    try {
        const { data } = await axios.post( BASE_URL + "/api/agents", newAgent )
        return data
    } catch (error) {
        alert("Something went wrong")
    }
}

export const getAgentById = async (id) => {
    try {
        const { data } = await axios.get( BASE_URL + `/api/agents/${id}`)
        return data
    } catch (error) {
        alert("Something went wrong")
    }
}

export const getAllCustomers = async () => {
	try {
		const { data } = await axios.get( BASE_URL + "/api/customers/")
		return data
	} catch (error) {
		alert("Something went wrong.")
	}
}

export const createNewCustomer = async (newCustomer) => {
    try {
        const { data } = await axios.post( BASE_URL + "/api/customers", newCustomer )
        return data
    } catch (error) {
        alert("Something went wrong")
    }
}

export const getCustomerById = async (id) => {
    try {
        const { data } = await axios.get( BASE_URL + `/api/customers/${id}`)
        return data
    } catch (error) {
        alert("Something went wrong")
    }
}

export const getAllQuerys = async () => {
	try {
		const { data } = await axios.get( BASE_URL + "/api/querys/")
		return data
	} catch (error) {
		alert("Something went wrong.")
	}
}

export const createNewQuery = async (newQuery) => {
    try {
        const { data } = await axios.post( BASE_URL + "/api/querys", newQuery )
        return data
    } catch (error) {
        alert("Something went wrong")
    }
}

export const getUnallotedQuerys = async () => {
	try {
		const { data } = await axios.get( BASE_URL + "/api/querys/unalloted")
		return data
	} catch (error) {
		alert("Something went wrong.")
	}
}

export const getAllotedQuerys = async (id) => {
    try {
        const { data } = await axios.get( BASE_URL + `/api/querys/agent/${id}`)
        return data
    } catch (error) {
        alert("Something went wrong")
    }
}

export const getQuerysByCustomerId = async (id) => {
    try {
        const { data } = await axios.get( BASE_URL + `/api/querys/customer/${id}`)
        return data
    } catch (error) {
        alert("Something went wrong")
    }
}

export const allotQuery = async (id, agentId) => {
    try {
        const { data } = await axios.patch( BASE_URL + `/api/querys/agent/${id}`, { agentId })
        return data
    } catch (error) {
        alert("Something went wrong")
    }
}

export const updateConversation = async (id, conversation) => {
    try {
        const { data } = await axios.patch( BASE_URL + `/api/querys/conversation/${id}`, { conversation })
        return data
    } catch (error) {
        alert("Something went wrong")
    }
}

export const resolveQuery = async (id) => {
    try {
        const { data } = await axios.patch( BASE_URL + `/api/querys/resolve/${id}`)
        return data
    } catch (error) {
        alert("Something went wrong")
    }
}

export const fetchCannedMsgs = async (category) => {
    try {
        const { data } = await axios.get( BASE_URL + `/api/querys/cannedMsgs/${category}`)
        return data
    } catch (error) {
        alert("Something went wrong.")
    }
}
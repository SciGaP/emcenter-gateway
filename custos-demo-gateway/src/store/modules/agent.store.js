/*Agent.store.js*/

import agent_management from "@/service/agent_management";


const getDefaultState = () => {
    return {
        agents: [],
        clientLevelRoles: [],
        isAgentsEnabled: false
    }
}

const state = getDefaultState()

const actions = {

    async enableAgents({commit}, data) {
        let resp = await agent_management.enableAgents(data)
        commit('SET_AGENTS_ENABLED', resp.data.status)
        return resp.data.status
    },

    async registerAgent({commit}, data) {
        let rep = await agent_management.registerAgent(data)
        let id = rep.data.id
        let da = {
            id: id,
            status: 'ACTIVE',
            attributes: []
        }
        commit('ADD_AGENTS', da)
        return rep.data
    },

    // eslint-disable-next-line no-unused-vars
    async getAgent({commit}, data) {
        let response = await agent_management.getAgent(data)
        return response.data
    },

    // eslint-disable-next-line no-unused-vars
    async activateAgent({commit}, data) {
        let response = await agent_management.activateAgent(data)
        let id = data.agent_id
        commit('SET_ACTIVATED_AGENT', id)
        return response.data
    },

    // eslint-disable-next-line no-unused-vars
    async deactivateAgent({commit}, data) {
        let response = await agent_management.deactivateAgent(data)
        let id = data.agent_id
        commit('SET_DEACTIVATED_AGENT', id)
        return response.data
    },


    // eslint-disable-next-line no-unused-vars
    async addAttributeToAgent({commit}, data) {
        let response = await agent_management.addAttributesToAgent(data)
        return response.data
    },

    // eslint-disable-next-line no-unused-vars
    async deleteAttributeFromAgent({commit}, data) {
        let response = await agent_management.deleteAttributesFromAgent(data)
        return response.data
    },


    async get_all_agents({commit}, data) {
        let response = await agent_management.getAllAgents(data)
        let agents = response.data.agents
        agents.forEach(agent => {
            agent.status = (agent.isEnabled ? 'ACTIVE':'DISABLED')
        })
        commit('SET_AGENTS', response.data.agents)
        return response.data.agents
    },
    // eslint-disable-next-line no-unused-vars
    async reset({commit}, data){
        commit('RESET')
        return true
    }

}


const mutations = {


    ADD_AGENTS(state, data) {
        state.agents.push(data)
    },

    SET_AGENTS(state, data) {
        state.agents = data
    },

    SET_CLIENT_LEVEL_ROLES(state, data) {
        state.clientLevelRoles = data
    },

    SET_AGENTS_ENABLED(state, data) {
        state.isAgentsEnabled = data
    },


    SET_DEACTIVATED_AGENT(state, data) {
        state.agents.forEach((agent) => {
            if (agent.id == data) {
                agent.status = "DEACTIVE"
            }
        })
    },

    SET_ACTIVATED_AGENT(state, data) {
        state.agents.forEach((agent) => {
            if (agent.id == data) {
                agent.status = "ACTIVE"
            }
        })
    },

    RESET(state) {
        Object.assign(state, getDefaultState())
    }

}

const getters = {

    getAgents(state) {
        return state.agents
    },

    isAgentsAreEnabled(state) {
        return state.isAgentsEnabled
    },

    getAgentClientRoles(state) {
        return state.clientLevelRoles
    }

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}


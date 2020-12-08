const state = {
    datasetMap: {},
    paginatedDatasetListMap: {}
};

function _getDatasetsQueryString({offset = 0, limit = 20, collectionId}) {
    const params = {offset, limit};

    if (collectionId) Object.assign(params, {collectionId});

    const queryString = Object.keys(params).map(paramKey => `${paramKey}=${params[paramKey]}`).join("&");

    return queryString;
}

const actions = {
    async fetchDatasets({commit}, {offset, limit, collectionId}) {
        const queryString = _getDatasetsQueryString({offset, limit, collectionId});

        // TODO
        console.log(`[FETCH] /collection/${collectionId}/dataset?` + queryString);
        await new Promise(resolve => setTimeout(resolve, 500));

        const datasets = [1, 2, 3, 12, 13, 14, 55, 66].map(datasetId => {
            return {
                datasetId,
                collectionId,
                datasetName: `Dataset ${datasetId}`,
                createdBy: "Jane",
                createdAt: "12/22/2020"
            };
        });

        const datasetIds = datasets.map((
            {datasetId, collectionId, datasetName, createdBy, createdAt}
        ) => {
            commit("SET_DATASET", {
                datasetId, collectionId, datasetName, createdBy, createdAt
            });

            return datasetId;
        });

        commit("SET_PAGINATED_DATASET_LIST", {queryString, datasetIds});
    }
}


const mutations = {
    SET_DATASET(state, {datasetId, collectionId, datasetName, createdBy, createdAt}) {
        state.datasetMap[datasetId] = {
            datasetId, collectionId, datasetName, createdBy, createdAt
        };
    },
    SET_PAGINATED_DATASET_LIST(state, {queryString, datasetIds}) {
        state.paginatedDatasetListMap[queryString] = datasetIds;
    }
}

const getters = {
    getDatasets: (state, getters) => ({datasetId, collectionId, datasetName, createdBy, createdAt}) => {
        console.log("###### getDatasets : ", {datasetId, collectionId, datasetName, createdBy, createdAt});
        const queryString = _getDatasetsQueryString({datasetId, collectionId, datasetName, createdBy, createdAt});
        const datasetIds = state.paginatedDatasetListMap[queryString];
        if (datasetIds) {
            return datasetIds.map(datasetId => getters.getDataset(datasetId));
        } else {
            return null;
        }
    },
    getDataset: (state) => (datasetId) => {
        return state.datasetMap[datasetId];
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
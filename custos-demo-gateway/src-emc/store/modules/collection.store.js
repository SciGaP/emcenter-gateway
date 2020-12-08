const state = {
    collectionMap: {},
    paginatedCollectionListMap: {}
};

function _getCollectionsQueryString({offset = 0, limit = 20, pi = null, author = null, fromDate = null, toDate = null}) {
    const params = {offset, limit};

    if (pi) Object.assign(params, {pi});
    if (author) Object.assign(params, {author});
    if (fromDate) Object.assign(params, {fromDate});
    if (toDate) Object.assign(params, {toDate});

    const queryString = Object.keys(params).map(paramKey => `${paramKey}=${params[paramKey]}`).join("&");

    return queryString;
}

const actions = {
    async fetchCollection({commit}, {collectionId}) {

        // TODO
        console.log(`[FETCH] /collection/${collectionId}`);
        await new Promise(resolve => setTimeout(resolve, 500));

        const collection = {
            collectionId,
            collectionName: `Collection ${collectionId}`,
            createdBy: "Jane",
            createdAt: "12/22/2020",
            pi: "Thomas",
            author: "Ron",
            microscope: "Microscope 1",
            status: "Accessed"
        }

        const {collectionName, createdBy, createdAt, pi, author, microscope, status} = collection;

        commit("SET_COLLECTION", {
            collectionId, collectionName, createdBy, createdAt, pi, author, microscope, status
        });
    },
    async fetchCollections({commit}, {offset, limit, pi, author, fromDate, toDate}) {
        const queryString = _getCollectionsQueryString({offset, limit, pi, author, fromDate, toDate});

        // TODO
        console.log("[FETCH] /collection?" + queryString);
        await new Promise(resolve => setTimeout(resolve, 500));

        const collections = [1, 2, 3, 12, 13, 14, 55, 66].map(collectionId => {
            return {
                collectionId,
                collectionName: `Collection ${collectionId}`,
                createdBy: "Jane",
                createdAt: "12/22/2020",
                pi: "Thomas",
                author: "Ron",
                microscope: "Microscope 1",
                status: "Accessed"
            };
        });

        const collectionIds = collections.map((
            {collectionId, collectionName, createdBy, createdAt, pi, author, microscope, status}
        ) => {
            commit("SET_COLLECTION", {
                collectionId,
                collectionName,
                createdBy,
                createdAt,
                pi,
                author,
                microscope,
                status
            });

            return collectionId;
        });

        commit("SET_PAGINATED_COLLECTION_LIST", {queryString, collectionIds});
    }
}


const mutations = {
    SET_COLLECTION(state, {collectionId, collectionName, createdBy, createdAt, pi, author, microscope, status}) {
        state.collectionMap[collectionId] = {
            collectionId, collectionName, createdBy, createdAt, pi, author, microscope, status
        };
    },
    SET_PAGINATED_COLLECTION_LIST(state, {queryString, collectionIds}) {
        state.paginatedCollectionListMap[queryString] = collectionIds;
    }
}

const getters = {
    getCollections: (state, getters) => ({offset, limit, pi, author, fromDate, toDate}) => {
        const queryString = _getCollectionsQueryString({offset, limit, pi, author, fromDate, toDate});
        const collectionsIds = state.paginatedCollectionListMap[queryString];
        if (collectionsIds) {
            return collectionsIds.map(collectionId => getters.getCollection({collectionId}));
        } else {
            return null;
        }
    },
    getCollection: (state) => ({collectionId}) => {
        return state.collectionMap[collectionId];
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
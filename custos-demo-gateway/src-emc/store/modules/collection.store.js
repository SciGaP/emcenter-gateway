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
    /**
     * @param commit
     * @param collectionId
     * @returns {Promise}
     */
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

    /**
     * @param commit
     * @param offset
     * @param limit
     * @param pi
     * @param author
     * @param fromDate
     * @param toDate
     * @returns {Promise}
     */
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
        state.collectionMap = {
            ...state.collectionMap,
            [collectionId]: {
                ...state.collectionMap[collectionId],
                collectionId, collectionName, createdBy, createdAt, pi, author, microscope, status
            }
        };
    },
    SET_PAGINATED_COLLECTION_LIST(state, {queryString, collectionIds}) {
        state.paginatedCollectionListMap = {
            ...state.paginatedCollectionListMap,
            [queryString]: collectionIds
        };
    }
}


const getters = {
    /**
     * @param state
     * @param getters
     * @returns {getCollectionsCallback}
     */
    getCollections: (state, getters) => {
        /**
         * @callback getCollectionsCallback
         * @param {Object} filter
         * @param {number} filter.offset
         * @param {number} filter.limit
         * @param {string} filter.pi
         * @param {string} filter.fromDate
         * @param {string} filter.toDate
         * @returns {(import('../typedefs').Collection[] | null)}
         */
        return ({offset, limit, pi, author, fromDate, toDate}) => {
            const queryString = _getCollectionsQueryString({offset, limit, pi, author, fromDate, toDate});
            const collectionsIds = state.paginatedCollectionListMap[queryString];
            if (collectionsIds) {
                return collectionsIds.map(collectionId => getters.getCollection({collectionId}));
            } else {
                return null;
            }
        }
    },

    /**
     * @param state
     * @returns {getCollectionCallback}
     */
    getCollection: (state) => {
        /**
         * @callback getCollectionCallback
         * @param {Object} collection
         * @param {number} collection.collectionId
         * @returns {import('../typedefs').Collection}
         */
        return ({collectionId}) => {
            if (state.collectionMap[collectionId]) {
                return state.collectionMap[collectionId];
            } else {
                return null;
            }
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
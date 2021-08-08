import axios from "axios";

export default {
    namespaced: true, // avoiding collisions in methods naming
    state: () => ({
        campaign: {
            campaignName: "New campaign",
            selectedBiddingStrategy: null,
            budgetOptimizationEnabled: true,
            adSets: [{
                name: "New ad set",
                dailyBudget: 0,
                selectedCurrency: {
                    name: "RUB",
                    value: "RUB",
                    label: "₽",
                },
                dateFrom: "",
                timeFrom: "",
                isFinite: false,
                dateTo: "",
                timeTo: "",
                geoCollection: [
                ],
                ads: [
                ]
            }],
        },
        biddingStrategies: [
            {
                name: "Set budget",
                value: "setBudget",
                hint: "Budget strategy hint"
            },
            {
                name: "Auction",
                value: "auction",
                hint: "Auction strategy hint"
            },
        ],
        currencies: [
            {
                name: "USD",
                value: "USD",
                label: "$",
            },
            {
                name: "EUR",
                value: "EUR",
                label: "€",
            },
            {
                name: "RUB",
                value: "RUB",
                label: "₽",
            }
        ],
    }),
    getters: {
        getCampaign(state) {
          return state.campaign;
        },
        getCampaignName(state) {
            return state.campaign.campaignName;
        },
    },
    // don't call async functions in mutations cause they're sync!
    mutations: {
        setCampaignName(state, payload) {
            state.campaign.campaignName = payload;
        },
        setProperty(state, payload) {
            let propertyKey = Object.keys(payload)[0];
            let propertyPath = propertyKey.split(".");
            let value = payload[propertyKey];
            propertyPath.reduce((nestedObject, objectProperty, index) => {
                let positiveIntegerRegex = new RegExp(/^\d+$/);
                objectProperty = objectProperty.match(positiveIntegerRegex) ? Number.parseInt(objectProperty) : objectProperty;
                if (
                    Object.prototype.hasOwnProperty.call(nestedObject, objectProperty) ||
                    (Array.isArray(nestedObject) && Number.isInteger(objectProperty))
                ) {
                    if (index < propertyPath.length - 1) {
                        return nestedObject[objectProperty];
                    }
                    nestedObject[objectProperty] = value;
                    return value;
                } else {
                    throw new Error(`Module doesn't contain ${propertyPath} property`)
                }
            }, state)
        }
    },

    actions: {
        updateProperty(context, payload) {
            context.commit('setProperty', payload);
        },
        // here we setting campaign name asynchronously
        setCampaignName(context, payload) {
            context.commit('setCampaignName', payload);
        },
        SAVE_TODO: async (context, payload) => {
            let {data} = await axios.post('http://yourwebsite.com/api/todo'); // destructurization of response (look for js object destructuring)
            payload.push(data);
            context.commit('ADD_TODO', payload);
        },
    },
};


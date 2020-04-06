
export default {
    'cases': {
        veryCommon: { gt: 10 },
        common: { from: 10, to: 100 },
        uncommon: { from: 100, to: 1000 },
        rare: { from: 1000, to: 10000 },
        veryRare: { lt: 10000 }
    },
    'percents': {
        greater2: { gt: 2 },
        less2: { lt: 2 }
    }
};

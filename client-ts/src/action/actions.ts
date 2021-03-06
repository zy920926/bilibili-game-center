import actionTypes from "./actionTypes";
// home
const setHomeBanner = (items:bannerItemI[]) =>({
    items,
    type:actionTypes.getHomeBanner,
});

const setHomeHotGame = (items:gameIconItemI[]) =>({
    items,
    type:actionTypes.getHomeHotGame,
});

const setHomeNewGame = (items:gameIconItemI[]) =>({
    items,
    type:actionTypes.getHomeNewGame,
});

const setHomeHotStrategy = (items:homeStrategyItemI[]) =>({
    items,
    type:actionTypes.getHomeHotStrategy,
});

const setHomeOrderGame = (items:homeOrderGameItemI[]) =>({
    items,
    type:actionTypes.getHomeOrderGame,
});

const setHomeNewestActivity = (item:homeActivityItemI) =>({
    item,
    type:actionTypes.getHomeNewestActivity,
});

const setHomePreviousActivity = (items:homeActivityItemI[]) =>({
    items,
    type:actionTypes.getHomePreviousActivity,
});
// find 
const setFindBanner = (items:bannerItemI[]) =>({
    items,
    type:actionTypes.getFindBanner,
});

const setFindSpecial = (items:bannerWithIdItemI[]) =>({
    items,
    type:actionTypes.getFindSpecial,
});

const setFindOrdrNewGame = (items:gameIconItemI[]) =>({
    items,
    type:actionTypes.getFindOrdrNewGame,
});

const setFindBiliGame = (items:gameIconItemI[]) =>({
    items,
    type:actionTypes.getFindBiliGame,
});

const setFindPayGame = (items:gameIconItemI[]) =>({
    items,
    type:actionTypes.getFindPayGame,
});

const setFindHotComment = (items:findHotCommentItemI[]) =>({
    items,
    type:actionTypes.getFindHotComment,
});

const setStrategyHotGame = (items:bannerWithIdItemI[]) =>({
    items,
    type:actionTypes.getStrategyHotGame,
});

// my
const setMyUserBoard= (item:userPageInfoI) =>({
    item,
    type:actionTypes.getMyUserBoard,
});

const setMyMenu= (item:myMenuDataI) =>({
    item,
    type:actionTypes.getMyMenu,
});

const setRankPageTab = (item:pageTabIndexI) =>({
    item,
    type:actionTypes.getRankPageTab,
});

const setRankHotGameList = (items:gameListItemI[]) =>({
    items,
    type:actionTypes.getRankHotGameList,
});

const setRankExpectGameList = (items:newGameListItemI[]) =>({
    items,
    type:actionTypes.getRankExpectGameList,
});

const setRankGoodGameList = (items:gameListItemI[]) =>({
    items,
    type:actionTypes.getRankGoodGameList,
});

const setRankNewGameList = (items:gameListItemI[]) =>({
    items,
    type:actionTypes.getRankNewGameList,
});


const setFindGameClassify = (items:findGameClassifyItemI[]) =>({
    items,
    type:actionTypes.getFindGameClassify,
});

const setStrPageStrategyList = (items:strategyListItemI[]) =>({
    items,
    type:actionTypes.getStrPageStrategyList,
});

const setSearchHotKeys = (items:string[]) =>({
    items,
    type:actionTypes.getSearchHotKeys,
});

const setLoginState = (state:number) =>({
    state,
    type:actionTypes.getLoginState,
});

export {
    setHomeBanner,
    setHomeHotGame,
    setHomeNewGame,
    setHomeHotStrategy,
    setHomeOrderGame,
    setHomeNewestActivity,
    setHomePreviousActivity,
    setFindBanner,
    setFindSpecial,
    setFindOrdrNewGame,
    setFindBiliGame,
    setFindPayGame,
    setFindHotComment,
    setStrategyHotGame,
    setStrPageStrategyList,
    setMyUserBoard,
    setMyMenu,
    setRankPageTab,
    setRankHotGameList,
    setRankExpectGameList,
    setRankGoodGameList,
    setRankNewGameList,
    setFindGameClassify,
    setSearchHotKeys,
    setLoginState
};
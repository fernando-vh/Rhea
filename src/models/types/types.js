export const types = {
    ACTIONS:{
        CLASSIC_LOGIN:  "[Auth] classic login",
        LOGOUT:         "[Auth] logout",
        CHANGE_BG:      "[UI] change bg"
    },
    EMOTIONS:{
        ALARMED:{
            name:'alarmed',
            color:'#a83248',
            code:0,
            class:'alarmed-emotion'
        },
        HAPPY:{
            name:'happy',
            color:'#f3c10a',
            code:1,
            class:'happy-emotion'
        },
        TIRED:{
            name:'tired',
            color:'#32a877',
            code:2,
            class:'tired-emotion'
        },
        SAD:{
            name:'sad',
            color:'#325ea8',
            code:3,
            class:'sad-emotion'
        }
    },
    SCREEN_BG_CLASS:{
        MAIN:'main',
        SUBROUTES:'subroutes'
    },
    SEARCH_COMPONENTS:{
        SONGS:'songs',
        USERS:'users'
    }
}
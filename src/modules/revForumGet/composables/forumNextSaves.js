import { computed } from 'vue'
import { useStore } from 'vuex'


const forumNext = () => {

    const store = useStore();

    const answersText = async (answersForum) => {

        const resp = await store.dispatch('forumNext/saveAnswersForum', answersForum)
        console.log(resp);
        return resp 
    }

    return {
        answersText,
    }
}

export default forumNext
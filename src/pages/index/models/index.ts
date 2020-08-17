import { upRecord, getUrl, sendMail } from '@/pages/services';

export default {

    namespace: 'index',
    state: {
        url: "",
        loading: false
    },
    effects: {
        *sendMails({ payload }: any, { call }: any) {
            yield call(sendMail, payload);
        },
        *loaded(_: any, { put }: any) {
            yield put({ type: "loade" })
        },
        *up({ payload }: any, { call }: any) {
            yield call(upRecord, payload);
        },
        *fetch({ payload }: any, { call, put }: any) {
            const res = yield call(getUrl, payload);
            yield put({
                type: 'save',
                payload: {
                    ...res,
                    loading: true
                }
            })
        },
    },
    reducers: {
        loade: (state: any) => {
            return {
                ...state,
                loading: false
            }
        },
        save: (state: any, { payload }: any) => {
            return {
                ...state,
                ...payload
            }
        },
    }
}
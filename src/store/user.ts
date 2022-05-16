import type { IUserList } from '@/types/user/userlist';
import { defineStore } from "pinia";
import { getItem, setItem, removeItem } from "@/utils/storage";
import { getUserInfo } from '@/http/api/user/user.api';
import { ElMessage } from 'element-plus';
import { TOKEN, USERINFO } from '@/utils/constants';

interface UserState {
    token: string
    userInfo: IUserList
}
export const userStoreInstance = defineStore('main', {
    state: (): UserState => {
        return {
            token: getItem(TOKEN),
            userInfo: getItem(USERINFO)
        }
    },
    getters: {
        getToken(): string | null {
            return this.token
        },
    },
    actions: {
        SET_TOKEN(value: string) {
            this.token = value
            setItem(TOKEN, value)
            this.getUserInfo()
        },
        async getUserInfo() {
            const { code, msg, data } = await getUserInfo();
            if (code === 200) {
                this.userInfo = data
                setItem(USERINFO, data)
            } else {
                ElMessage.error(msg)
            }
        },
        LOG_OUT() {
            removeItem(TOKEN)
            removeItem(USERINFO)
        }
    },
})
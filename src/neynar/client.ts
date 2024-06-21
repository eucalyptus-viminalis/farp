import { appConfig } from '@/app/appConfig'
import {NeynarAPIClient} from '@neynar/nodejs-sdk'

export const neynar_client = new NeynarAPIClient(appConfig.neynar_api_key, {
    // axiosInstance,
    // basePath,
    // logger,
})
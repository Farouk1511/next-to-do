import { httpBatchLink } from "@trpc/client";
import { appRouter } from "../../../server";
import { createCallerFactory } from "../../../server/trpc";

const createCaller = createCallerFactory(appRouter)

export const serverClient = createCaller({
    links: [
        httpBatchLink({
            url: "https://next-to-dwxw8k2rl-farouk1511.vercel.app/api/trpc"
        })
    ]
})
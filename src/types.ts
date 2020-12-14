import * as z from "zod";

export interface listPostsParams{
    count: string,
    id: string,
    maxCursor: string,
    minCursor: string,
    sourceType: string
  }

export interface getUserInfoParams {
  validUniqueId: string
}
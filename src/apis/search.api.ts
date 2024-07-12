import { ListDataResponse } from "~/types/utils.type";
import http from "~/utils/http";

export interface SearchResult {
  id: number;
  title: string;
  type: string;
  url: string;
  description: string;
  datetime: string;
}

const searchApi = {
  search(
    query: string,
    options?: {
      offset?: number;
      limit?: number;
      scope?: "all" | "my_project" | "subprojects";
      all_words?: boolean;
      titles_only?: boolean;
      issues?: boolean;
      news?: boolean;
      documents?: boolean;
      changesets?: boolean;
      wiki_pages?: boolean;
      messages?: boolean;
      projects?: boolean;
      open_issues?: boolean;
      attachments?: "0" | "1" | "only";
    },
  ) {
    let params = `q=${encodeURIComponent(query)}`;

    if (options) {
      if (options.offset !== undefined) params += `&offset=${options.offset}`;
      if (options.limit !== undefined) params += `&limit=${options.limit}`;
      if (options.scope) params += `&scope=${options.scope}`;
      if (options.all_words !== undefined) params += `&all_words=${options.all_words}`;
      if (options.titles_only !== undefined) params += `&titles_only=${options.titles_only}`;
      if (options.issues !== undefined) params += `&issues=${options.issues ? 1 : 0}`;
      if (options.news !== undefined) params += `&news=${options.news ? 1 : 0}`;
      if (options.documents !== undefined) params += `&documents=${options.documents ? 1 : 0}`;
      if (options.changesets !== undefined) params += `&changesets=${options.changesets ? 1 : 0}`;
      if (options.wiki_pages !== undefined) params += `&wiki_pages=${options.wiki_pages ? 1 : 0}`;
      if (options.messages !== undefined) params += `&messages=${options.messages ? 1 : 0}`;
      if (options.projects !== undefined) params += `&projects=${options.projects ? 1 : 0}`;
      if (options.open_issues !== undefined) params += `&open_issues=${options.open_issues ? 1 : 0}`;
      if (options.attachments) params += `&attachments=${options.attachments}`;
    }

    return http.get<ListDataResponse<SearchResult[]>>(`/search.json?${params}`);
  },
};

export default searchApi;

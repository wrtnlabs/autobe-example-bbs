import { IPage } from "./IPage";
import { IBan } from "./IBan";

/**
 * Paginated list/container for ban records, with page metadata according to the
 * standard IPage structure.
 *
 * @autobe Generated by AutoBE - https://github.com/wrtnlabs/autobe
 */
export type IPageIBan = {
  pagination?: IPage.IPagination;
  data?: IBan[];
};

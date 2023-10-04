import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import SiteModel, { SiteDocument, SiteInput } from "../models/site.model";

export async function createSite(input: SiteInput) {
  return SiteModel.create(input);
}

export async function findSite(
  query: FilterQuery<SiteDocument>,
  options: QueryOptions = { lean: true }
) {
  return SiteModel.findOne(query, {}, options);
}

export async function listSites(
  query: FilterQuery<SiteDocument> = {},
  options: QueryOptions = { lean: true }
) {
  return SiteModel.find(query);
}

export async function findAndUpdateSite(
  query: FilterQuery<SiteDocument>,
  update: UpdateQuery<SiteDocument>,
  options: QueryOptions
) {
  return SiteModel.findOneAndUpdate(query, update, options);
}

export async function deleteSite(query: FilterQuery<SiteDocument>) {
  return SiteModel.deleteOne(query);
}

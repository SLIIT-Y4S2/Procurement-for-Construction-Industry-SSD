interface ISite {
  _id: string;
  name: string;
  address: string;
  city: string;
  mapLocation: string;
  contactNumber: string;
  siteId: string;
  createdAt: string;
  updatedAt: string;
}

interface ISiteContext {
  sites: ISite[];
  createSite: (site: ISite) => Promise<void>;
  deleteSite: (id: string) => Promise<void>;
  updateSite: (id: string, updatedSite: ISite) => Promise<void>;
}

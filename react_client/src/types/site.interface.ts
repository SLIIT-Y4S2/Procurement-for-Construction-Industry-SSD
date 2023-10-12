interface Site {
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
  sites: Site[];
  createSite: (site: Site) => Promise<void>;
  deleteSite: (id: string) => Promise<void>;
  updateSite: (id: string, updatedSite: Site) => Promise<void>;
}

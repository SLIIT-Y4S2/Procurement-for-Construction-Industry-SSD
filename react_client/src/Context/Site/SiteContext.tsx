"use client";
import React, { ReactNode, createContext, useEffect, useState } from "react";
import SiteService from "@/context/Site/site.service";
import { App } from "antd";

export const SiteContext = createContext<ISiteContext>({
  sites: [],
  createSite: async () => {},
  deleteSite: async () => {},
  updateSite: async () => {},
});

const SiteContextProvider = ({ children }: { children: ReactNode }) => {
  const [sites, setSites] = useState<ISite[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { message } = App.useApp();

  useEffect(() => {
    const getAllSites = async () => {
      // Fetch all sites from the server and update the sites array
      const allSites = await SiteService.fetchAllSites();
      setSites(allSites);
      setLoading(false);
    };
    getAllSites();
  }, []);

  const createSite = async (site: ISite) => {
    try {
      const createdSite = await SiteService.createSite(site);
      // Add new site to the sites array
      setSites((prevSites) => [...prevSites, createdSite]);
      message.success("Site created successfully");
    } catch (error: any) {
      message.error(error.message);
      throw new Error(error);
    }
  };

  const deleteSite = async (id: string) => {
    await SiteService.deleteSite(id);
    // Filter out the site with the given id
    setSites((prevSites) => prevSites.filter((site) => site._id !== id));
  };

  const updateSite = async (siteId: string, updatedSite: ISite) => {
    try {
      const updated = await SiteService.updateSite(siteId, updatedSite);
      // Find the site with the given siteId and update its properties
      setSites((prevSites) =>
        prevSites.map((site) =>
          site.siteId === siteId ? { ...site, ...updated } : site
        )
      );
      message.success("Site updated successfully");
    } catch (error: any) {
      message.error(error.message);
      throw new Error(error);
    }
  };

  return (
    <SiteContext.Provider value={{ sites, createSite, deleteSite, updateSite }}>
      {children}
    </SiteContext.Provider>
  );
};

export default SiteContextProvider;

import React, { useContext, useState } from "react";
import SiteForm from "@/components/molecules/SiteForm";
import { Button, Drawer } from "antd";
import { EditFilled } from "@ant-design/icons";
import { SiteContext } from "@/context/Site/SiteContext";

const SiteEdit = ({ currentSite }: { currentSite: ISite }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { updateSite } = useContext(SiteContext) as ISiteContext;
  const closeDrawer = () => setIsOpen(false);
  const callUpdateSite = async (values: ISite) => {
    try {
      await updateSite(currentSite.siteId, values);
      closeDrawer();
    } catch (e) {}
  };
  return (
    <div>
      <Button onClick={() => setIsOpen(true)} icon={<EditFilled />}>
        Edit
      </Button>
      <Drawer
        title="Edit Site"
        placement="right"
        onClose={closeDrawer}
        open={isOpen}
        width={600}
      >
        <SiteForm currentSite={currentSite} formSubmission={callUpdateSite} />
      </Drawer>
    </div>
  );
};

export default SiteEdit;

import React, { useContext, useState } from "react";
import SiteForm from "@/components/molecules/SiteForm";
import { Button, Drawer } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { SiteContext } from "@/Context/Site/SiteContext";

const AddSite = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { createSite } = useContext(SiteContext) as ISiteContext;
  const closeDrawer = () => setIsOpen(false);
  const callCreateSite = async (values: Site) => {
    try {
      await createSite(values);
      closeDrawer();
    } catch (e) {}
  };
  return (
    <>
      <Button
        type="primary"
        onClick={() => setIsOpen(true)}
        icon={<PlusOutlined />}
      >
        Add New Site
      </Button>
      <Drawer
        title="Edit Site"
        placement="right"
        onClose={closeDrawer}
        open={isOpen}
        width={600}
      >
        <SiteForm formSubmission={callCreateSite} />
      </Drawer>
    </>
  );
};

export default AddSite;

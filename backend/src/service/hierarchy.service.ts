import { omit } from "lodash";
import HierarchyModel, { HierarchyInput } from "../models/hierarchy.model";

/* Function to get a particular hierarchy */
export async function getHierarchy(hierarchyId: string) {
  try {
    const hierarchy = await HierarchyModel.findOne({
      hierarchyId: hierarchyId,
    });

    return omit(hierarchy?.toJSON(), "hierarchyFound");
  } catch (e: any) {
    throw new Error(e);
  }
}

/* Function to get all hierarchies */
export async function getAllHierarchies() {
  try {
    const hierarchies = await HierarchyModel.find();

    //return omit(hierarchies, "allHierarchies");

    return hierarchies;
  } catch (e: any) {
    throw new Error(e);
  }
}

/* Function to create a new hierarchy */
export async function createHierarchy(input: HierarchyInput) {
  try {
    const hierarchy = await HierarchyModel.create(input);

    return omit(hierarchy.toJSON(), "");
  } catch (e: any) {
    throw new Error(e);
  }
}

/* Fnction to update an existing hierarchy */
export async function updateHierarchy(
  hierarchyId: string,
  input: HierarchyInput
) {
  const updatedHierarchy = await HierarchyModel.findOneAndUpdate(
    { hierarchyId: hierarchyId },
    {
      $set: {
        lowerBoundPrice: input.lowerBoundPrice,
        upperBoundPrice: input.upperBoundPrice,
        managerInCharge: input.managerInCharge,
      },
    },
    { new: true }
  );

  if (updatedHierarchy) {
    return omit(updatedHierarchy, "updatedHierarchy");
  } else {
    return false;
  }
}

/* Function to delete a hierarchy */
export async function deleteHierarchy(hierarchyId: string) {
  try {
    const deletedHierarchy = await HierarchyModel.deleteOne({
      hierarchyId: hierarchyId,
    });

    return omit(deletedHierarchy, "deletedHierarchy");
  } catch (e: any) {
    throw new Error(e);
  }
}

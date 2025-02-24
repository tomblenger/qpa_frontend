import { client } from '@/lib/utils/customAxios';
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction
} from '@reduxjs/toolkit';
import type { TypeProject } from '@/lib/types';

export const getAllProjects = createAsyncThunk(
  'projects/getAllProjects',
  async () => {
    const data = await client(
      `${process.env.NEXT_PUBLIC_PRODUCT_BACKEND_URL}/admin/getAllProjects`
    );
    // console.log(data);
    return data;
  }
);

interface ProjectState {
  isFetching: boolean;
  projects: TypeProject[];
  projectCounts: {
    allProjects: number;
    vaPackageNum: number;
    vaPackageHour: number;
    vaPackageUsedHour: number;
    obmPackageNum: number;
    obmPackageHour: number;
    obmPackageUsedHour: number;
    smmPackageNum: number;
    compSmmPackageNum: number;
    wdsPackageNum: number;
    compWdsPackageNum: number;
  };
}

const initialState: ProjectState = {
  isFetching: true,
  projects: [],
  projectCounts: {
    allProjects: 0,
    vaPackageNum: 0,
    vaPackageHour: 0,
    vaPackageUsedHour: 0,
    obmPackageNum: 0,
    obmPackageHour: 0,
    obmPackageUsedHour: 0,
    smmPackageNum: 0,
    compSmmPackageNum: 0,
    wdsPackageNum: 0,
    compWdsPackageNum: 0
  }
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjectCounts: (
      state,
      action: PayloadAction<(typeof initialState)['projectCounts']>
    ) => {
      state.projectCounts = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProjects.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(
        getAllProjects.fulfilled,
        (state, action: PayloadAction<TypeProject[]>) => {
          state.isFetching = false;
          state.projects = action.payload;
          let vaPackageNum = 0;
          let vaPackageHour = 0;
          let vaPackageUsedHour = 0;
          let obmPackageNum = 0;
          let obmPackageHour = 0;
          let obmPackageUsedHour = 0;
          let smmPackageNum = 0;
          let compSmmPackageNum = 0;
          let wdsPackageNum = 0;
          let compWdsPackageNum = 0;
          for (const project of action.payload) {
            if (project.package_type === 'va') {
              vaPackageNum += 1;
              vaPackageHour += project.monthly_hours || 0;
              project.projectTask?.forEach((task) => {
                vaPackageUsedHour += task.estimated_time || 0;
              });
            }
            if (project.package_type === 'obm') {
              obmPackageNum += 1;
              obmPackageHour += project.monthly_hours || 0;
              project?.projectTask?.forEach((task) => {
                obmPackageUsedHour += task.estimated_time || 0;
              });
            }
            if (project.package_type === 'smm') {
              smmPackageNum += 1;
              if (project.state === 'completed') {
                compSmmPackageNum += 1;
              }
            }
            if (project.package_type === 'wds') {
              wdsPackageNum += 1;
              if (project.state === 'completed') {
                compWdsPackageNum += 1;
              }
            }
          }

          state.projectCounts = {
            allProjects: action.payload.length,
            vaPackageNum,
            vaPackageHour,
            vaPackageUsedHour,
            obmPackageNum,
            obmPackageHour,
            obmPackageUsedHour,
            smmPackageNum,
            compSmmPackageNum,
            wdsPackageNum,
            compWdsPackageNum
          };
        }
      )
      .addCase(getAllProjects.rejected, (state) => {
        state.isFetching = false;
      });
  }
});

export const { setProjectCounts } = projectSlice.actions;

export default projectSlice.reducer;

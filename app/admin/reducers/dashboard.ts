import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {client} from "@/lib/utils/customAxios";
import type {TypeClient, TypeProject, TypeTask, TypeUser} from "@/lib/types";
import Dashboard from "@/app/admin/dashboard/page";

const role = localStorage.getItem("role");

export interface RevenueData {
  total: number;
  growth: number;
  monthly_goal: number;
  progress: number;
}

export interface ProjectData {
  total: number;
  progress: number;
  review: number;
  hold: number;
  growth: number;
}

export interface TaskData {
  total: number;
  pending: number;
  ongoing: number;
  done: number;
  overdue: number;
  growth: number;
}

export interface MemberData {
  total: number;
  register_week: number;
  register_now: number;
}

export interface weekData {
  name: string;
  revenue: number;
  users: number;
}

export type ActivityData = {
  month: weekData [];
  month_3: weekData [];
  year: weekData [];
}

export type table_employees = {
  id: number;
  full_name: string;
  avatar: string;
  email: string;
  country: string;
  phone: string;
  role: string;
  status: string;
  verified: boolean;
  created_at: string;
  updated_at: string;
}

export type table_project = {
  package_name: string;
  client: string;
  team: string;
  deadline: string;
  progress: number;
  status: string;
}

export type table_task = {
  title: string;
  assignee: string;
  priority: string;
  due_date: string;
  project: string;
  status: string;
}

export type table_client = {
  title: string,
  assignee: string,
  name: string;
  priority: number,
  due_date: Date,
  project: string,
  status: string;
  total_value: number;
}

export type OverviewDataType = {
  revenue: RevenueData;
  project: ProjectData;
  task: TaskData;
  member: MemberData;
  activity: ActivityData;
}

export type TableDataType = {
  employees?: table_employees[];
  projects?: table_project[];
  tasks?: table_task[];
  clients?: table_client[];
}

type DashboardDataState = {
  isOverview: boolean,
  isTableFetching: boolean;
  overviewData: OverviewDataType;
  tableData: TableDataType;
}

export const getOverview = createAsyncThunk(
  'dashboard/getOverview',
  async () => {
    const data = await client(
      `${process.env.NEXT_PUBLIC_PRODUCT_BACKEND_URL}/admin/getOverview`,
    );
    // console.log(data);
    return data;
  }
);

export const getTableData = createAsyncThunk(
  'dashboard/getTableData',
  async () => {
    const data = await client(
      `${process.env.NEXT_PUBLIC_PRODUCT_BACKEND_URL}/admin/getTableData`,
    )
    return data
  }
)

const initialState: DashboardDataState = {
  isOverview: true,
  isTableFetching: false,
  overviewData: {
    revenue: {
      total: 50000,
      growth: 12.5,
      monthly_goal: 60000,
      progress: 83.3,
    },
    project: {
      total: 20,
      progress: 60,
      review: 5,
      hold: 3,
      growth: 8.2,
    },
    task: {
      total: 100,
      pending: 20,
      ongoing: 50,
      done: 25,
      overdue: 5,
      growth: 10.1,
    },
    member: {
      total: 200,
      register_week: 15,
      register_now: 3,
    },
    activity: {
      month: [
        { name: "Week 1", revenue: 10000, users: 50 },
        { name: "Week 2", revenue: 12000, users: 60 },
        { name: "Week 3", revenue: 9000, users: 45 },
        { name: "Week 4", revenue: 11000, users: 55 },
      ],
      month_3: [
        { name: "January", revenue: 30000, users: 150 },
        { name: "February", revenue: 28000, users: 140 },
        { name: "March", revenue: 32000, users: 160 },
      ],
      year: [
        { name: "2024", revenue: 360000, users: 1800 },
      ],
    },
  },
  tableData: {
    employees: [
      {
        id: 1,
        full_name: "John Doe",
        avatar: "avatar1.jpg",
        email: "john@example.com",
        country: "USA",
        phone: "+123456789",
        role: "Manager",
        status: "Active",
        verified: true,
        created_at: "2024-01-15",
        updated_at: "2024-02-20",
      },
    ],
    projects: [
      {
        package_name: "Website Redesign",
        client: "ABC Corp",
        team: "Design Team",
        deadline: "2024-06-01",
        progress: 75,
        status: "Ongoing",
      },
    ],
    tasks: [
      {
        title: "UI Update",
        assignee: "John Doe",
        priority: "High",
        due_date: "2024-03-10",
        project: "Website Redesign",
        status: "Ongoing",
      },
    ],
    clients: [
      {
        title: "Marketing Campaign",
        assignee: "Jane Smith",
        name: "XYZ Ltd.",
        priority: 1,
        due_date: new Date("2024-04-15"),
        project: "Brand Awareness",
        status: "Pending",
        total_value: 15000,
      },
    ],
  },
};

const DashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setDashboardData: (
      state,
      action: PayloadAction<(typeof initialState)>
    ) => {
      state = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOverview.pending, (state) => {
        state.isOverview = true;
      })
      .addCase(getOverview.fulfilled, (state, action: PayloadAction<OverviewDataType>) => {
        state.isOverview = false;
        state.overviewData = action.payload;
      })
      .addCase(getOverview.rejected, (state) => {
        state.isOverview = false;
      })
      .addCase(getTableData.pending, (state) => {
        state.isTableFetching = true;
      })
      .addCase(getTableData.fulfilled, (state, action) => {
        state.isTableFetching = false;
        state.tableData = action.payload;
      })
      .addCase(getTableData.rejected, (state, action) => {
        state.isTableFetching = false;
      })
  }
});

export const { setDashboardData } = DashboardSlice.actions;

export default DashboardSlice.reducer;

<template>
  <el-row justify="end">
    <el-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 6 }">
      <el-input placeholder="Filter" v-model="query"></el-input>
    </el-col>
  </el-row>
  <el-row>
    <el-col>
      <el-table
        ref="table"
        :data="filteredTableData"
        :default-sort="{ prop: 'day', order: 'descending' }"
      >
        <el-table-column type="expand">
          <template #default="props">
            <p>{{ props.row.summary }}</p>
            <el-row
              v-for="{ id, file, title, description, tags } in props.row
                .documents"
              :key="id"
              :gutter="16"
              style="margin-top: 2em"
            >
              <el-col
                :xs="{ span: 24 }"
                :sm="{ span: 12 }"
                style="font-size: var(--el-font-size-medium); margin-top: 1em"
              >
                <el-link :href="file" icon="el-icon-document">{{
                  title
                }}</el-link>
              </el-col>
              <el-col
                :xs="{ span: 24 }"
                :sm="{ span: 6 }"
                style="margin-top: 1em"
              >
                <el-tag v-for="tag in tags" :key="tag" size="small">{{
                  tag
                }}</el-tag>
              </el-col>
              <el-col v-if="description.length" style="margin-top: 1em">
                <i class="el-icon-info"></i> {{ description }}
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="Day" prop="day" sortable> </el-table-column>
        <el-table-column label="Title" prop="title"> </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      query: undefined,
      tableData: [],
    };
  },
  computed: {
    filteredTableData() {
      let { query } = this;

      if (query && query.length) {
        query = query.toLowerCase();
        return this.tableData.filter(({ summary }) =>
          summary.toLowerCase().includes(query)
        );
      } else {
        return this.tableData;
      }
    },
  },
  async mounted() {
    const tableData = await this.eventList();

    this.tableData = tableData;
  },
  methods: {
    ...mapActions({ eventList: "eventList" }),
  },
};
</script>

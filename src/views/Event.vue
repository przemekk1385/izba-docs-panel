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
            <el-divider> </el-divider>
            <el-row
              v-for="{ id, file, title, description, tags } in props.row
                .documents"
              :key="id"
              :gutter="16"
              style="margin-bottom: 1em"
            >
              <el-col style="font-size: var(--el-font-size-medium)">
                <el-space wrap>
                  <el-button
                    icon="el-icon-document"
                    @click="getDocument(file)"
                    :loading="loading[file]"
                    >{{ title }}</el-button
                  >
                  <el-tag v-for="tag in tags" :key="tag" size="small">{{
                    tag
                  }}</el-tag>
                </el-space>
              </el-col>
              <el-col v-if="description.length" style="margin-top: 0.5em">
                <i class="el-icon-info"> </i> {{ description }}
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
      loading: {},
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
    ...mapActions({ documentServe: "documentServe", eventList: "eventList" }),
    async getDocument(file) {
      this.loading[file] = true;

      const blob = await this.documentServe(file);
      if (blob) {
        window.open(URL.createObjectURL(blob));
      }

      delete this.loading[file];
    },
  },
};
</script>

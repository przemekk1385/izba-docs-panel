<template>
  <el-row>
    <el-col>
      <el-table
        ref="table"
        :data="tableData"
        :default-sort="{ prop: 'event', order: 'descending' }"
      >
        <el-table-column type="expand">
          <template #default="props">
            <p>{{ props.row.description || "---" }}</p>
          </template>
        </el-table-column>
        <el-table-column label="Event" prop="event" sortable>
          <template #default="{ row: { event } }">
            <el-tooltip :content="event" placement="top" effect="light">
              <span>{{ truncate(event) }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="Title" prop="title"> </el-table-column>
        <el-table-column
          :filters="tagFilters"
          :filter-method="filterTag"
          filter-placement="bottom-end"
          fixed="right"
          label="Tags"
          width="100px"
        >
          <template #default="{ row: { tags } }">
            <el-tag v-for="tag in tags" :key="tag" size="small">{{
              tag
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="Actions" width="120px">
          <template #default="{ row: { file } }">
            <el-link :href="file" type="primary"> Download </el-link>
          </template>
        </el-table-column>
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
      tagFilters: [],
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
    const tableData = await this.documentList();
    const tagList = await this.tagList();

    this.tableData = tableData;
    this.tagFilters = tagList.map((tag) => ({ text: tag, value: tag }));
  },
  methods: {
    ...mapActions({ documentList: "documentList", tagList: "tagList" }),
    filterTag(value, { tags }) {
      return tags.indexOf(value) !== -1;
    },
    truncate(text) {
      return `${text.substr(0, 9)}…`;
    },
  },
};
</script>

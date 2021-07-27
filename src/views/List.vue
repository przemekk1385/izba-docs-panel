<template>
  <el-row>
    <el-col :offset="20" :span="4">
      <el-input placeholder="Filtruj" v-model="query"></el-input>
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
              <el-col :span="8" style="font-size: var(--el-font-size-medium)">
                <i class="el-icon-document"></i> {{ title }}
              </el-col>
              <el-col :span="14" style="text-align: right">
                <el-tag v-for="tag in tags" :key="tag" size="small">{{
                  tag
                }}</el-tag>
              </el-col>
              <el-col :span="2">
                <el-link :href="file" icon="el-icon-download">Pobierz</el-link>
              </el-col>
              <el-col v-if="description.length" style="margin-top: 1em">
                <i class="el-icon-info"></i> {{ description }}
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="Data" prop="day" sortable> </el-table-column>
        <el-table-column label="Tytuł" prop="title"> </el-table-column>
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

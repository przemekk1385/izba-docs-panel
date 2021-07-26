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
export default {
  name: "Home",
  components: {},
  data() {
    return {
      query: undefined,
      tableData: [
        {
          id: 2,
          title: "113 posiedzenie Zarządu Izby",
          day: "2017-01-23",
          summary:
            "113 posiedzenie Zarządu odbyło się 23 stycznia 2018 r. Podczas posiedzenia omówiono m.in strukturę finansów i rozliczeń Izby, przyjęto harmonogram organizacji seminariów, omówiono przyjęcie Regulaminu Zarządu oraz omówiono ofertę ubezpieczeń.",
          documents: [
            {
              id: 1,
              file: "http://127.0.0.1:8000/docs/9de47ce2-ac23-4620-a9ef-88a9b3ab47f1.pdf",
              title: "Protokół",
              description: "spam spam spam spam spam",
              tags: ["protokół"],
            },
            {
              id: 2,
              file: "http://127.0.0.1:8000/docs/9de47ce2-ac23-4620-a9ef-88a9b3ab47f1.pdf",
              title: "Uchwała",
              description: "",
              tags: ["uchwała"],
            },
          ],
        },
        {
          id: 1,
          title: "112 posiedzenie Zarządu Izby",
          day: "2017-01-23",
          summary:
            "112 posiedzenie Zarządu odbyło się 23 stycznia 2017 r. Podczas posiedzenia omówiono m.in strukturę finansów i rozliczeń Izby, przyjęto harmonogram organizacji seminariów, omówiono przyjęcie Regulaminu Zarządu oraz omówiono ofertę ubezpieczeń.",
          documents: [
            {
              id: 1,
              file: "http://127.0.0.1:8000/docs/9de47ce2-ac23-4620-a9ef-88a9b3ab47f1.pdf",
              title: "Protokół",
              description: "spam spam spam spam spam",
              tags: ["protokół"],
            },
            {
              id: 2,
              file: "http://127.0.0.1:8000/docs/9de47ce2-ac23-4620-a9ef-88a9b3ab47f1.pdf",
              title: "Uchwała",
              description: "",
              tags: ["uchwała"],
            },
          ],
        },
      ],
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
};
</script>

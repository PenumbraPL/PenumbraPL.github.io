<script>
  export default {
    data() {
      console.log('fetch data')
      return {
        tableData: {
          headers: ["Opis", "Status", "Transport", "Waga", "Szczegoly"],
          rows: []
        }
      };
    },
    created() {
      console.log('fetch created')
    },
    methods: {
      async fetchData() {
        console.log('fetch fetchData')      
        const response = await fetch('http://localhost:3001/track-package');      
        this.tableData.rows = await response.json();
        console.log(this.tableData[0])
      },    
    },
    mounted() {
      this.fetchData();
    },
  };
</script>
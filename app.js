new Vue ({
    el:'#app',
    data:{
        currencies:{},
        amount: 0,
        from: 'EUR',
        to: 'USD',
        result: 0
        
    },

    mounted() {

        this.getCurrencies()
       
       
    },

    methods: {
            getCurrencies(){

                const currencies = localStorage.getItem('currencies')

                if(currencies) {
                    this.currencies = JSON.parse(currencies);
                    console.log(Object.values(this.currencies));
                    console.log(Object.keys(this.currencies))
                    return;
                }
                axios.get("https://free.currencyconverterapi.com/api/v6/currencies")
                .then(response=>{
                    //console.log(response.results);
                    this.currencies = response.data.results;
                    localStorage.setItem('currencies', JSON.stringify(response.data.results))
                })
                .catch(error=>{ console.log("error happened"+error)});
            },

            convertCurrency(){

                const key = `${this.from}_${this.to}`;

                axios.get(`https://free.currencyconverterapi.com/api/v6/convert?q=${this.from}_${this.to}`)
                .then((response) =>{
                    //console.log(response.data.results[key].val);
                    this.result = response.data.results[key].val;
                })
            }
    },

    computed: {
        formattedCurrencies(){
            return Object.values(this.currencies);
            
        },

        calculateResult(){
            return (Number(this.amount) * this.result).toFixed(3);
        },

        disabled(){
            return this.amount === 0 || !this.amount;
        }
    }
})
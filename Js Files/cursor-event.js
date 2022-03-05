AFRAME.registerComponent("cursor-listener",{
    schema:{
        selectedItemId:{default:"", type:"string"}
    },
    handlePlaceListState:function(){
        const id=this.el.getAttribute("id")
        const placesId=[
            "taj-mahal",
            "new-york",
            "budapest",
            "eiffel-tower"
        ]
        if (placesId.includes(id)){
            const placeContainer=document.querySelector("#places-container")
            placeContainer.setAttribute("cursor-listener",{
                selectedItemId:id
            })
            this.el.setAttribute("material",{
                color:"#d76b30",
                opacity:10
            })
        }
    },
    handleMouseEnterEvents:function(){
        this.el.addEventListener("mouseenter",()=>{
            this.handlePlaceListState()
        })
    },
    handleMouseLeaveEvents:function(){
        this.el.addEventListener("mouseleave",()=>{
            const {selectedItemId}=this.data
            if (selectedItemId){
                const el=document.querySelector(`#${selectedItemId}`)
                const id=el.getAttribute("id")
                if(id==selectedItemId){
                    el.setAttribute("material",{
                        color:"#0077cc",
                        opacity:1
                    })
                }
            }
        })
    },
    handleClickEvents:function(){
        this.el.addEventListener("click",evt=>{
            const placesContainer=document.querySelector("#places-container")
            const {state} = placesContainer.getAttribute("tour")
            if (state==="places-list"){
                const id=this.el.getAttribute("id")
                const placesId=[
                    "budapest",
                    "taj-mahal",
                    "new-york-city",
                    "eiffel-tower"
                ]
                if(placesId.includes(id)){
                    placesContainer.setAttribute("tour",{
                        state:"view",
                        selectedCard:id
                    })
                }
            }
            if(state==="view"){
                this.handleViewState()
            }
            if(state==="change-view"){
                this.handleViewState()
            }
        })
    },
    handleViewState:function(){
        const el=this.el
        const id=el.getAttribute("id")
        const placesContainer=document.querySelector("#places-container")
        const sideViewId=[
            "places-1",
            "places-2",
            "places-3",
            "places-4"
        ]
        const {selectedItemId}=placesContainer.getAttribute("cursor-listener")
        if(sideViewId.includes(id)){
            placesContainer.setAttribute("tour",{
                state:"change-view",
            })
        }
        const skyEl=document.querySelector("#main-container")
        skyEl.setAttribute("material",{
            src:`./assets/360_images/${selectedItemId}/${id}.jpg`,
            color:"#fff"
        })
        console.log()
    },
    init:function(){
        this.handleMouseEnterEvents()
        this.handleMouseLeaveEvents()
        this.handleClickEvents()
    }
})
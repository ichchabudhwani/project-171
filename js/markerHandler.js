

AFRAME.registerComponent("markerHandler",{
    init:async function () {
      this.el.addEventListener("markerFound",()=>{
          console.log("marker is found")
          this.handleMarkerFound();
      });
      this.el.addEventListener("markerLost",()=>{
          console.log("marker is lost")
          this.handleMarkerLost();
      })
    },
    handleMarkerFound:function () {
      var toy = toy.filter(toy => toy.id === markerId);

      //Check if the dish is available
      if (toy.is_out_of_stock.includes()) {
        swal({
          icon: "warning",
          title: toy.toy_name.toUpperCase(),
          text: "Toy is out of stock!!!",
          timer: 2500,
          buttons: false
        });
      } else {
        //Changing Model scale to initial scale
        var model = document.querySelector(`#model-${toy.id}`);
        model.setAttribute("position", toy.model_geometry.position);
        model.setAttribute("rotation", toy.model_geometry.rotation);
        model.setAttribute("scale", toy.model_geometry.scale);
  
        //Update UI conent VISIBILITY of AR scene(MODEL , INGREDIENTS & PRICE)     
        model.setAttribute("visible", true);
  
        var ingredientsContainer = document.querySelector(`#main-plane-${toy.id}`);
        ingredientsContainer.setAttribute("visible", true);
  
        var priceplane = document.querySelector(`#price-plane-${toy.id}`);
        priceplane.setAttribute("visible", true)
  
      }
      var buttondiv =document.getElementById("button-div");
      buttondiv.style.display="flex";
  
      var ratingButton=document.getElementById("rating-button");
      var orderButton=document.getElementById("order-button")
  
      ratingButton.addEventListener("click",function () {
       swal ({
          icon:"warning",
      
          title:"order summary",
          text:"work in progress"
      });
       
      });
      orderButton.addEventListener("click",function (){
          swal({
              icon:"https://i.imgur.com/4NZ6uLY.jpg",
              title:"Thanks for order",
              text:"Your order will be dilvered soon at your home!"
          });
      });
   
     
    },
    handleOrder:function(uid,toy){
      firebase
       .firestore()
       .collection(users)
       .doc(uid)
       .get()
       .then(doc=>{
         var details=doc.data()
         if(details["current_orders"][toy.id]){
          details["current_orders"][toy.id]["quantity"]+=1
          var current_quantity=["current_orders"][toy.id]["quantity"]
          details["current_orders"][dish.id]["subtotal"] =
          current_quantity * toy.price;
         }else{
          details["current_orders"][toy.id] = {
            item: toy.toy_name,
            price: toy.price,
            quantity: 1,
            subtotal: toy.price * 1
          };
         }
         details.total_bill+=toy.price
         firebase
         .firestore()
         .collection("users")
         .doc(doc.id)
         .update(details);
       })

      
    },
    handleMarkerLost:function () {
      var buttondiv =document.getElementById("button-div");
      buttondiv.style.display="none";
      
    },
    getAllToys: async function() 
    { return await firebase 
     .firestore() 
     .collection("toys") 
     .get() 
     .then(snap => { return snap.docs.map(doc => doc.data()); }); 
    }
   
  });


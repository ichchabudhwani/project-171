AFRAME.registerComponent("create-markers", {
  
    init: async function() { 
      var mainScene = document.querySelector("#main-scene"); 
      //get the dishes collection from firestore database 
      var toys = await this.getAllToys();
  
  
      toys.map(toy=>{
        var marker=document.createElement("a-marker");
        marker.setAttribute("id",dish.id);
        marker.setAttribute("type","pattern");
        marker.setAttribute("url",toy.marker_pattern_url);
        marker.setAttribute("cursor",{
          rayOrigin:"mouse"
        });
        marker.setAttribute("markerhandler",{});
        mainScene.appendChild(marker);
        
        var model=document.createElement("a-entity");
        model.setAttribute("id",`model-${dish.id}`);
        model.setAttribute("position",toy.model_geometry.position)
        model.setAttribute("rotation",toy.model_geometry.rotation)
        model.setAttribute("scale",toy.model_geometry.scale)
        model.setAttribute("gltf-model",`url(${toy.model_url})`);
        model.setAttribute("gesture-handler",{})
        marker.appendChild(model);
  
        var mainPlane=document.createElement("a-plane");
        mainPlane.setAttribute("id",`main-plane-${toy.id}`);
        mainPlane.setAttribute("position",{x:0,y:0,z:0});
        mainPlane.setAttribute("rotation",{x:-90,y:0,z:0});
        mainPlane.setAttribute("width",1.7);
        mainPlane.setAttribute("height",1.5);
        marker.appendChild(mainPlane); 
  
        var titlePlane=document.createElement("a-plane");
        titlePlane.setAttribute("id",`title-plane-${toy.id}`);
        titlePlane.setAttribute("position",{x:0,y:0.89,z:0.02});
        titlePlane.setAttribute("rotation",{x:0,y:0,z:0});
        titlePlane.setAttribute("width",1.69);
        titlePlane.setAttribute("height",0.3);
        marker.appendChild(titlePlane);
  
        var toyTitle=document.createElement("a-entity");
        toyTitle.setAttribute("id",`toy-title-${toy.id}`)
        toyTitle.setAttribute("position",{x:0,y:0,z:0.1});
        toyTitle.setAttribute("rotation",{x:0,y:0,z:0});
        toyTitle.setAttribute("text",{
        font:"monoid",
        color:"white",
        width:1.8,
        height:1,
        align:"center",
        value:toy.toy_name.toUpperCase()
         });
         titlePlane.appendChild(toyTitle);
  
      });
      var pricePlane = document.createElement("a-image");
      pricePlane.setAttribute("id", `price-plane-${dish.id}`);
      pricePlane.setAttribute(
        "src",
        "https://raw.githubusercontent.com/whitehatjr/menu-card-app/main/black-circle.png"
      );
      pricePlane.setAttribute("width", 0.8);
      pricePlane.setAttribute("height", 0.8);
      pricePlane.setAttribute("position", { x: -1.3, y: 0, z: 0.3 });
      pricePlane.setAttribute("rotation", { x: -90, y: 0, z: 0 });

      //Price of the dish
      var price = document.createElement("a-entity");
      price.setAttribute("id", `price-${toy.id}`);
      price.setAttribute("position", { x: 0.03, y: 0.05, z: 0.1 });
      price.setAttribute("rotation", { x: 0, y: 0, z: 0 });
      price.setAttribute("text", {
        font: "mozillavr",
        color: "white",
        width: 3,
        align: "center",
        value: `Only\n $${price}`
      });

      pricePlane.appendChild(price);
      marker.appendChild(pricePlane);
    
    }, //function to get the dishes collection from firestore database
     getAllToys: async function() 
     { return await firebase 
      .firestore() 
      .collection("toys") 
      .get() 
      .then(snap => { return snap.docs.map(doc => doc.data()); }); }
  
    
    });
  
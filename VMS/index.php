<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vaxhealth</title>

    <!-- Font CDN -->
 <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Winky+Rough:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet">

<!-- CSS file -->
<!-- <link rel="stylesheet" href="./assets/CSS/nav.css"> -->
<link rel="stylesheet" href="./assets/CSS/style.css">


<!-- Remix ICON CDN -->
<link
    href="https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css"
    rel="stylesheet"
/>

<!-- ----Jquery cdn -->
    <script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>



<!-- Bootstrap CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

<!-- Bootstrap JS bundle -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
</head>
<body>
  <!-- --------------- Head Section----------- -->

    <header>
<!-- --------------------Navbar---------------- -->
<div class="pre-nav">
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum rerum quod quibusdam illum eaque. </p>

</div>
    <nav>
  <div class="lft-nav">
    <a href="#"><img src="./assets/image/logo.png" alt="logo" class="logo" width="100"></a>

  </div>
  <div class="cent-nav">
    <a href="#">HOME</a>
    <a href="#about">ABOUT US</a>
    <a href="#">VACCINE</a>
    <a href="#">CONTACT US</a>
    <a href="#">LOGIN</a>
  </div>
  <div class="right-nav ">
    <button class="" >REGISTER NOW</button>
  
  </div>
 

  <i class="ri-menu-3-line"></i>

   <i class="ri-moon-fill" id="toggleDark"></i>
</nav>
<section>
   </header>
    <!-- --------------- responsive navbar------------ -->
<div class="responsive-nav">
<i class="ri-close-large-line"></i>
    <a href="#">HOME</a>
    <a href="#about">ABOUT US</a>
    <a href="#">VACCINE</a>
    <a href="#">CONTACT US</a>
    <a href="#">LOGIN</a>
    <div class="res-nav-btn">
    <button>REGISTER NOW</button>
    
</div>
</div>
    </section>


<!-- ------------------Head banner-------------------- -->
<section class="banner">
   
<div class="container hd-banner">
    <div class="hero-hd">
        <h1>“A Healthier Tomorrow Begins with a Single Shot Today”</h1>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio accusantium maxime, vel, doloribus adipisci     numquam consectetur porro impedit officia accusamus est molestiae quae illo, eos voluptates. Fuga a repellendus     quibusdam?</p>

        <div class="hero-btn">
        <button>REGISTER NOW</button>
        </div>

    </div>
    <div>
        <img src="./assets/image/banner-pic.png"  alt="pic" class="slide-left" width="">
    </div>
</div>

</section>
 
    <!-- ---------------------------------counter------------------------ -->

<section>
    <div class="num-counter">

     <div class="container py-4" style="padding-left:10vw;">
    <div class= "row mx-4">
      <div class="col-lg-3 col-md-3 col-sm-3 col-3 ">
       
          <div ><h2 class="counter" style="padding-left:20px; font-size:5vw;">15</h2></div>
        <p style="padding-left:10px;">Year Of Experience</p>
       
      </div>
  
      <div class="col-lg-3 col-md-3 col-sm-3 col-3 ">
        <h2 class="counter" style="padding-left:20px; font-size:5vw;">414</h2>
        <p style="padding-left:10px;">Happy Clients</p>
      </div>
  
      <div class="col-lg-3 col-md-3 col-sm-3 col-3 ">
        <h2 class="counter" style="padding-left:20px; font-size:5vw;">521</h2>
        <p style="padding-left:10px;">Successfull Stories</p>
      </div>
  
      <div class="col-lg-3 col-md-3 col-sm-3 col-3 ">
        <h2 class="counter" style="padding-left:20px; font-size:5vw;">14</h2>
        <p style="padding-left:10px;">Awards Recognitions</p>
      </div>
  
    </div>
  </div>
  
    </div>
</section>


<!-- -----------------banner2 aboutUs ---------------->

<section id=about>

<div class="bn2">

    <div>

        <img src="./assets/image/bn2.png" class="slide-left" alt="pic" width="">
    </div>
    <div class="bn2-content">
        <h2>Our Mission & Values</h2>
        <h1 style="color:#BD3988;">“Vaccinate Your Family’s mission is to protect people of all ages from vaccine-preventable diseases"</h1>

        <h2>Our Core Values:</h2>

        <p><strong>Innovation:</strong> VH will carry on the legacy of its dauntless co-founders by continuing to seek bold solutions to current and future vaccination challenges.</p>

        <p><strong>Honor:</strong> VH remembers those who have suffered from vaccine-preventable diseases and pledges to honor them through all our work</p>

        <p><strong>Equity and Inclusion:</strong> VH puts the needs of marginalized communities first and intentionally strives to ensure equitable access to life-saving vaccines..</p>

        <p><strong>Community and Partnerships:</strong> VH values the transformative impact of collaboration and works with partners to further cultural understanding and build inclusive and empowering partnerships to reignite a culture of immunization.</p>


    </div>
</div>


</section>

<!-- --------------footer----------------- -->

<footer>


</footer>




<!-- ------------------------------------- -->

    <script src=./assets/js/nav.js></script>


   <script>
    var icon = document.getElementById("toggleDark");

    icon.onclick = function() {
        document.body.classList.toggle("dark-theme");
        
        // Toggle icon classes (assuming you're using Remix Icons)
        if (document.body.classList.contains("dark-theme")) {
            icon.classList.remove("ri-moon-fill");
            icon.classList.add("ri-sun-line");
        } else {
            icon.classList.remove("ri-sun-line");
            icon.classList.add("ri-moon-fill");
        }
    }
</script>

<!-- ---------------- counter up------ -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/waypoints/4.0.1/jquery.waypoints.min.js" integrity="sha512-CEiA+78TpP9KAIPzqBvxUv8hy41jyI3f2uHi7DGp/Y/Ka973qgSdybNegWFciqh6GrN2UePx2KkflnQUbUhNIA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/Counter-Up/1.0.0/jquery.counterup.min.js" integrity="sha512-d8F1J2kyiRowBB/8/pAWsqUl0wSEOkG5KATkVV4slfblq9VRQ6MyDZVxWl2tWd+mPhuCbpTB4M7uU/x9FlgQ9Q==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>



<script>
    $('.counter').counterUp({
    delay: 10,
    time: 1000
});
</script>

  
    <!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/waypoints/4.0.1/jquery.waypoints.min.js" ></script> -->

</body>
</html>
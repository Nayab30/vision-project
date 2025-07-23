<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>

    <!-- Font CDN -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Audiowide&display=swap" rel="stylesheet">

<!-- CSS file -->
<link rel="stylesheet" href="./assets/CSS/style.css">

<!-- Remix ICON CDN -->
<link
    href="https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css"
    rel="stylesheet"
/>

<!-- Bootstrap CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

<!-- Bootstrap JS bundle -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

</head>
<body>
  <!-- --------------- Head Section----------- -->
  <header>
<!-- --------------------Navbar---------------- -->
<nav>
  <div class="lft-nav">
    <a href="#"><img src="./assets/images/logo.png" alt="logo" width="100"></a>

  </div>
  <div class="cent-nav">
    <a href="#">HOME</a>
    <a href="#">ABOUT US</a>
    <a href="#">COURSES</a>
    <a href="#">CONTACT US</a>
    <a href="#">LOGIN</a>
  </div>
  <div class="right-nav">
    <button>Get Started</button>
  
  </div>

  <i class="ri-menu-3-line"></i>

</nav>

<!-- --------------- responsive navbar------------ -->
<div class="responsive-nav">
  <i class="ri-close-large-line"></i>
  <a href="#">HOME</a>
    <a href="#">ABOUT US</a>
    <a href="#">COURSES</a>
    <a href="#">CONTACT US</a>
    <a href="#">LOGIN</a>
     <div class="res-nav-btn">
    <button>Get Started</button>
    
  </div>
</div>

<!-- ------------------Head banner-------------------- -->

<div id="vanta-canva">
  <div class="container hero-hd">
    <h1>Welcom to <span style="color:#de653f;">SkillPilot</span></h1>

    <h2 class="hero-hd2">Learn <span style="color:#de653f;" class="auto-type"></span></h2>
    <p>Confused about which course to take? We've got you covered! Browse courses and discover the best option for you. It's free! <span style="color:#de653f;">SkillPilot</span> is my effort to teach the basics and those coding techniques in a short time that took me years to master</p>
  </div>

<div class="hero-btn">
    <button>Get Started</button>
  
  </div>
</div>
</div>


  </header>

















  
<!-- ----------------------------------------------------footer-------------------------------- -->


  <footer>




  </footer>



<script src="https://unpkg.com/typed.js@2.1.0/dist/typed.umd.js"></script>

<script>
  var typed = new Typed(".auto-type",{
    strings :["Web Development","Python","JAVA","Machine Learning","C++"],
    typeSpeed : 300,
    backSpeed : 300,
    loop : true
  })
</script>
<script src="https://cdn.jsdelivr.net/npm/three@0.134/build/three.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.net.min.js"></script>
<script>
    VANTA.NET({
      el: "#vanta-canva",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 700.00,
      minWidth: 700.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0xde653f,
      backgroundColor: 0x16171b,
      spacing: 18.00,
     
  })
</script>
    <script src="./assets/JS/script.js"></script>
</body>
</html>
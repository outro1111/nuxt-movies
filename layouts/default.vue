<template>
  <div id="wrap">
    <header id="header">
      <h1><NuxtLink to="/"><img src="@/assets/images/logo.svg" alt="MovieRevue"></NuxtLink></h1>
      <nav>
        <ul>
          <li><NuxtLink to="/movies">LIST</NuxtLink></li>
          <li><NuxtLink to="/about">ABOUT</NuxtLink></li>
        </ul>
      </nav>
      <movieSearch />
    </header>

    <div id="content">
      <slot /> <!-- output the page content -->
    </div>
  </div>
</template>
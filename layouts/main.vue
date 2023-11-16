<template>
  <div id="wrap" class="main">
    <header id="header">
      <h1><NuxtLink to="/">MovieRevue</NuxtLink></h1>
      <nav>
        <ul>
          <li><NuxtLink to="/movies">List</NuxtLink></li>
          <li><NuxtLink to="/about">About</NuxtLink></li>
        </ul>
      </nav>
      <movieSearch />
    </header>

    <div id="content">
      <slot /> <!-- output the page content -->
    </div>
  </div>
</template>
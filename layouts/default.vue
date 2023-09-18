<template>
  <div id="wrap">
    <header id="header">
      <nav>
        <h1><NuxtLink to="/">Movies</NuxtLink></h1>
        <ul>
          <li><NuxtLink to="/movies">List</NuxtLink></li>
          <li><NuxtLink to="/about">About</NuxtLink></li>
        </ul>
      </nav>
    </header>

    <div id="content">
      <slot /> <!-- output the page content -->
    </div>
  </div>
</template>
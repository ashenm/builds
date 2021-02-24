Vue.component('v-slug', {

  props: [ 'slug', 'custodian' ],

  computed: {
    href: Slug.$match.bind(Slug)
  },

  template: '<a v-bind:href="href">{{ slug }}</a>'

});

Vue.component('v-branch', {

  props: [ 'branch' ],

  computed: {
    reference: function () {
      return this.branch ? this.branch.name : '∞';
    }
  },

  template: '<span>{{ reference }}</span>'

});

Vue.component('v-ref', {

  props: [ 'href', 'number' ],

  computed: {
    reference: function () {
      return this.number ? this.number : '∞';
    }
  },

  template: '<a v-bind:href="href">{{ reference }}</a>'

});

Vue.component('v-checksum', {

  props: {
    commit: {
      type: Object,
      default: Object.create.bind(null, null)
    }
  },

  computed: {
    sha: function () {
      return this.commit.sha ? this.commit.sha.slice(0, 7) : '∞';
    }
  },

  template: '<a v-bind:href="commit.compare_url">{{ sha }}</a>'

});

Vue.component('v-end', {

  props: [ 'end' ],

  computed: {
    reference: function () {
      return this.end ? moment(this.end).fromNow() : '∞';
    }
  },

  template: '<span>{{ reference }}</span>'

});

// vim: set expandtab shiftwidth=2:

class Slug {

  static travis (component) {
    return `https://travis-ci.com/${component.slug}`;
  }

  static github (component) {
    return `https://github.com/${component.slug}/actions`;
  }

  static $match (component) {
    return this[component.custodian](component);
  }

}

// vim: set expandtab shiftwidth=2:

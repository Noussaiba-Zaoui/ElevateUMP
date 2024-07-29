const Widget = {
  id: undefined,
  hasBackground: undefined
};

const SelectOption = {
  label: "",
  value: ""
};

const SelectInput = {
  label: "",
  name: "",
  options: [],
  placeholder: ""
};

const WrapperTagProps = {
  ...Widget,
  children: null,
  containerClass: ""
};

const BackgroundProps = {
  children: null,
  hasBackground: undefined
};

const Header = {
  title: "",
  subtitle: "",
  tagline: "",
  position: 'center'
};
const Header2 = {
  title: "",
  subtitle: "",
  tagline: "",
  position: 'center'
};
const HeadlineProps = {
  header: Header,
  containerClass: "",
  titleClass: "",
  subtitleClass: ""
};

const CallToActionType = {
  text: "",
  href: "",
  icon: null,
  targetBlank: undefined
};

const LinkOrButton = {
  callToAction: CallToActionType,
  containerClass: "",
  linkClass: "",
  iconClass: ""
};

const Button = {
  title: "",
  type: ""
};

const Input = {
  type: "",
  label: "",
  value: "",
  name: "",
  autocomplete: "",
  placeholder: ""
};

const Textarea = {
  cols: undefined,
  rows: undefined,
  label: "",
  name: "",
  placeholder: ""
};

const Checkbox = {
  label: "",
  value: ""
};

const Radio = {
  label: ""
};

const RadioBtn = {
  label: "",
  radios: []
};

const SmallForm = {
  icon: null,
  input: Input,
  btn: Button
};

const FormProps = {
  title: "",
  description: "",
  inputs: [],
  selectInputs: [],
  radioBtns: RadioBtn,
  textareas: [],
  checkboxes: [],
  scanStudentCards: {
    label: "",
    name: ""
  },
  scanStudentCardImages: null,
  btn: Button,
  btnPosition: 'center',
  containerClass: ""
};

const Image = {
  link: "",
  src: "",
  alt: ""
};

const Item = {
  title: "",
  description: "",
  href: "",
  form: SmallForm,
  icon: null,
  callToAction: CallToActionType
};

const ItemGrid = {
  id: "",
  items: [],
  columns: undefined,
  defaultColumns: undefined,
  defaultIcon: null,
  containerClass: "",
  panelClass: "",
  iconClass: "",
  titleClass: "",
  descriptionClass: "",
  actionClass: ""
};

const Timeline = {
  id: "",
  items: [],
  defaultIcon: null,
  containerClass: "",
  panelClass: "",
  iconClass: "",
  titleClass: "",
  descriptionClass: ""
};

const Team = {
  name: "",
  occupation: "",
  image: Image,
  items: [],
  containerClass: "",
  imageClass: "",
  panelClass: "",
  nameClass: "",
  occupationClass: "",
  itemsClass: ""
};

const Testimonial = {
  testimonial: "",
  startSlice: undefined,
  endSlice: undefined,
  isTestimonialUp: undefined,
  hasDividerLine: undefined,
  name: "",
  job: "",
  image: Image,
  href: "",
  containerClass: "",
  panelClass: "",
  imageClass: "",
  dataClass: "",
  nameJobClass: "",
  nameClass: "",
  jobClass: "",
  testimonialClass: ""
};

const Link = {
  label: "",
  href: "",
  ariaLabel: "",
  icon: null
};

const Price = {
  title: "",
  callToAction: CallToActionType,
  callToAction2: CallToActionType,
  hasRibbon: undefined,
  ribbonTitle: "",
  isSelected: undefined
};

const Price2 = {
  title: "",
  hasRibbon: undefined,
  ribbonTitle: ""
};

const Column = {
  title: "",
  items: [],
  callToAction: CallToActionType
};

const MenuLink = {
  ...Link,
  links: []
};

const Links = {
  title: "",
  links: [],
  texts: []
};

const Tab = {
  link: Link,
  items: []
};

const Dropdown = {
  options: [],
  activeTab: 0,
  onActiveTabSelected: () => {},
  iconUp: null,
  iconDown: null
};

const ToggleMenuProps = {
  handleToggleMenuOnClick: () => {},
  isToggleMenuOpen: false
};

const WindowSize = {
  width: 0,
  height: 0
};

const HeroProps = {
  title: "",
  subtitle: "",
  tagline: "",
  callToAction: CallToActionType,
  callToAction2: CallToActionType,
  image: Image
};

const FAQsProps = {
  ...Widget,
  header: Header,
  items: [],
  columns: 0,
  tabs: [],
  callToAction: CallToActionType
};

const CollapseProps = {
  items: [],
  classCollapseItem: "",
  iconUp: null,
  iconDown: null
};

const CallToActionProps = {
  ...Widget,
  title: "",
  subtitle: "",
  callToAction: CallToActionType,
  callToAction2: CallToActionType,
  items: []
};

const FeaturesProps = {
  ...Widget,
  header: Header,
  items: [],
  columns: 1,
  isImageDisplayed: undefined,
  image: Image,
  isBeforeContent: undefined,
  isAfterContent: undefined
};

const ContentProps = {
  ...Widget,
  header: Header,
  content: "",
  items: [],
  image: Image,
  isReversed: undefined,
  isAfterContent: undefined
};

const StepsProps = {
  ...Widget,
  header: Header,
  items: [],
  isImageDisplayed: undefined,
  image: Image,
  isReversed: undefined
};

const TeamProps = {
  ...Widget,
  header: Header,
  teams: []
};

const AnnouncementProps = {
  title: "",
  callToAction: CallToActionType,
  callToAction2: CallToActionType
};

const TestimonialsProps = {
  ...Widget,
  header: Header,
  testimonials: [],
  isTestimonialUp: undefined,
  hasDividerLine: undefined,
  startSlice: undefined,
  endSlice: undefined,
  callToAction: CallToActionType
};

const PricingProps = {
  ...Widget,
  header: Header,
  header2: Header2,
  prices: []
};

const PricingProps2 = {
  ...Widget,
  header: Header,
  prices: []
};

const ComparisonProps = {
  ...Widget,
  header: Header,
  columns: []
};

const StatsProps = {
  ...Widget,
  items: []
};

const SocialProofProps = {
  ...Widget,
  images: []
};

const ContactProps = {
  ...Widget,
  header: Header,
  content: "",
  items: [],
  form: FormProps
};

const FooterProps = {
  title: "",
  links: [],
  columns: [],
  socials: [],
  footNote: "",
  theme: ""
};

const HeaderProps = {
  links: [],
  actions: [],
  isSticky: undefined,
  showToggleTheme: undefined,
  showRssFeed: undefined,
  position: 'center'
};

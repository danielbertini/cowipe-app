import { createMuiTheme } from "@material-ui/core/styles";

const shape = {
  borderRadius: 5,
  scrollSize: 1,
};

const palette = {
  type: "dark",
  primary: {
    main: "#212121",
  },
  secondary: {
    main: "#8F48FF",
  },
  error: {
    main: "#f44336",
  },
  success: {
    main: "#4CAF50",
  },
  info: {
    main: "#2196F3",
  },
  warning: {
    main: "#FF9800",
  },
  background: {
    default: "#121212",
    panel: "rgba(255,255,245,.015)",
  },
  text: {
    primary: "rgba(255,255,245,1)",
    secondary: "rgba(255,255,245,.4)",
    tertiary: "rgba(255,255,245,.2)",
  },
  status: [
    "#4CAF50", // green
    "#f44336", // red
  ],
  fab: "#FD3259",
  backdrop: "rgba(12,12,12,.9)",
  divider: "rgba(255,255,245,.03)",
};

const font = {
  size: 14,
  weight: {
    light: 300,
    regular: 400,
    bold: 700,
    black: 900,
  },
  lineHeight: "1.5",
  letterSpacing: -0.0223,
};

const typography = {
  useNextVariants: true,
  fontFamily: [
    "Roboto",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Oxygen-Sans",
    "Ubuntu",
    "Cantarell",
    "Helvetica Neue",
    "sans-serif",
  ].join(","),
  fontSize: font.size,
  lineHeight: font.lineHeight,
  letterSpacing: font.letterSpacing,
  fontWeightLight: font.weight.light,
  fontWeightRegular: font.weight.regular,
  fontWeightBold: font.weight.bold,
  fontWeightBlack: font.weight.black,
  h1: {
    fontSize: font.size + 14,
    fontWeight: font.weight.light,
    lineHeight: font.lineHeight,
    color: palette.text.primary,
    letterSpacing: font.letterSpacing,
  },
  h2: {
    fontSize: font.size + 12,
    fontWeight: font.weight.light,
    lineHeight: font.lineHeight,
    color: palette.text.primary,
    letterSpacing: font.letterSpacing,
  },
  h3: {
    fontSize: font.size + 10,
    fontWeight: font.weight.bold,
    lineHeight: font.lineHeight,
    color: palette.text.primary,
    letterSpacing: font.letterSpacing,
  },
  h4: {
    fontSize: font.size + 8,
    fontWeight: font.weight.bold,
    lineHeight: font.lineHeight,
    color: palette.text.primary,
    letterSpacing: font.letterSpacing,
  },
  h5: {
    fontSize: font.size + 6,
    fontWeight: font.weight.bold,
    lineHeight: font.lineHeight,
    color: palette.text.primary,
    letterSpacing: font.letterSpacing,
  },
  h6: {
    fontSize: font.size + 4,
    fontWeight: font.weight.bold,
    lineHeight: font.lineHeight,
    color: palette.text.primary,
    letterSpacing: font.letterSpacing,
  },
  subtitle1: {
    fontSize: font.size + 4,
    fontWeight: font.weight.regular,
    lineHeight: font.lineHeight,
    color: palette.text.primary,
    letterSpacing: font.letterSpacing,
  },
  subtitle2: {
    fontSize: font.size,
    fontWeight: font.weight.regular,
    lineHeight: font.lineHeight,
    color: palette.text.secondary,
    letterSpacing: font.letterSpacing,
  },
  body1: {
    fontSize: font.size,
    fontWeight: font.weight.regular,
    lineHeight: font.lineHeight,
    color: palette.text.primary,
    letterSpacing: font.letterSpacing,
  },
  body2: {
    fontSize: font.size - 2,
    fontWeight: font.weight.regular,
    lineHeight: font.lineHeight,
    color: palette.text.secondary,
    letterSpacing: font.letterSpacing,
  },
  button: {
    fontSize: font.size,
    fontWeight: font.weight.bold,
    textTransform: "none",
    whiteSpace: "nowrap",
    letterSpacing: font.letterSpacing,
  },
  caption: {
    fontSize: font.size,
    fontWeight: font.weight.regular,
    lineHeight: font.lineHeight,
    color: palette.text.primary,
    letterSpacing: font.letterSpacing,
  },
  overline: {
    fontSize: font.size,
    fontWeight: font.weight.regular,
    lineHeight: font.lineHeight,
    color: palette.text.primary,
    letterSpacing: font.letterSpacing,
  },
};

const shadows = [
  "none",
  "0 1px 1px 0 rgba(0,0,0,.0369)",
  "0 1px 1px 0 rgba(0,0,0,.0369), 0 2px 2px 0 rgba(0,0,0,.0369)",
  "0 1px 1px 0 rgba(0,0,0,.0369), 0 3px 4px 0 rgba(0,0,0,.0369)",
  "0 2px 3px 0 rgba(0,0,0,.0369), 0 4px 5px 0 rgba(0,0,0,.0369)",
  "0 3px 5px 0 rgba(0,0,0,.0369), 0 6px 10px 0 rgba(0,0,0,.0369)",
  "0 4px 5px 0 rgba(0,0,0,.0369), 0 8px 10px 1px rgba(0,0,0,.0369)",
  "0 4px 6px 0 rgba(0,0,0,.0369), 0 9px 12px 1px rgba(0,0,0,.0369)",
  "0 6px 9px 0 rgba(0,0,0,.0369), 0 12px 17px 2px rgba(0,0,0,.0369)",
  "0 8px 12px 0 rgba(0,0,0,.0369), 0 16px 24px 2px rgba(0,0,0,.0369)",
  "0 12px 19px 0 rgba(0,0,0,.0369), 0 24px 38px 3px rgba(0,0,0,.0369)",
  "0 12px 19px 0 rgba(0,0,0,.0369), 0 24px 38px 3px rgba(0,0,0,.0369)",
  "0 12px 19px 0 rgba(0,0,0,.0369), 0 24px 38px 3px rgba(0,0,0,.0369)",
  "0 12px 19px 0 rgba(0,0,0,.0369), 0 24px 38px 3px rgba(0,0,0,.0369)",
  "0 12px 19px 0 rgba(0,0,0,.0369), 0 24px 38px 3px rgba(0,0,0,.0369)",
  "0 12px 19px 0 rgba(0,0,0,.0369), 0 24px 38px 3px rgba(0,0,0,.0369)",
  "0 12px 19px 0 rgba(0,0,0,.0369), 0 24px 38px 3px rgba(0,0,0,.0369)",
  "0 12px 19px 0 rgba(0,0,0,.0369), 0 24px 38px 3px rgba(0,0,0,.0369)",
  "0 12px 19px 0 rgba(0,0,0,.0369), 0 24px 38px 3px rgba(0,0,0,.0369)",
  "0 12px 19px 0 rgba(0,0,0,.0369), 0 24px 38px 3px rgba(0,0,0,.0369)",
  "0 12px 19px 0 rgba(0,0,0,.0369), 0 24px 38px 3px rgba(0,0,0,.0369)",
  "0 12px 19px 0 rgba(0,0,0,.0369), 0 24px 38px 3px rgba(0,0,0,.0369)",
  "0 12px 19px 0 rgba(0,0,0,.0369), 0 24px 38px 3px rgba(0,0,0,.0369)",
  "0 12px 19px 0 rgba(0,0,0,.0369), 0 24px 38px 3px rgba(0,0,0,.0369)",
  "0 12px 19px 0 rgba(0,0,0,.0369), 0 24px 38px 3px rgba(0,0,0,.0369)",
  "0 12px 19px 0 rgba(0,0,0,.0369), 0 24px 38px 3px rgba(0,0,0,.0369)",
];

export const dark = createMuiTheme({
  shape: shape,
  typography: typography,
  palette: palette,
  shadows: shadows,
  overrides: {
    MuiSnackbar: {
      root: {
        fontSize: 80,
      },
      variantSuccess: {
        fontSize: 80,
      },
    },
    MuiSnackbarContent: {
      root: {
        fontSize: 80,
      },
      variantSuccess: {
        fontSize: 80,
      },
    },
    MuiDrawer: {
      paper: {
        elevation: 3,
        backgroundColor: palette.background.primary,
        scrollBehavior: "smooth",
        "&::-webkit-scrollbar": {
          height: shape.scrollSize,
          width: shape.scrollSize,
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: palette.secondary.main,
          borderRadius: shape.scrollRadius,
        },
      },
    },
    MuiTable: {
      root: {
        borderCollapse: "unset",
      },
    },
    MuiTableCell: {
      head: {
        borderBottom: `0px solid ${palette.divider}`,
      },
      body: {
        borderBottom: `1px solid ${palette.divider}`,
      },
      root: {
        borderBottom: `0px solid ${palette.divider}`,
      },
    },
    MuiTableBody: {
      root: {
        borderBottom: `0px solid ${palette.divider}`,
      },
    },
    MuiListItemText: {
      primary: {
        fontWeight: typography.fontWeightBold,
      },
      secondary: {
        fontWeight: typography.fontWeightRegular,
      },
    },
    MuiPaper: {
      root: {
        backgroundColor: palette.primary.main,
      },
    },
    MuiSvgIcon: {
      root: {
        color: palette.text.primary,
      },
    },
    MuiCardContent: {
      root: {
        "&:last-child": {
          paddingBottom: 16,
        },
      },
    },
    MuiDialog: {
      paper: {
        minHeight: 0,
        backgroundColor: "transparent",
        boxShadow: shadows[12],
        borderRadius: shape.borderRadius * 2,
      },
    },
    MuiDialogTitle: {
      root: {
        padding: 15,
        paddingTop: 14,
        paddingBottom: 14,
        backgroundColor: palette.primary.main,
        "& h2": {
          margin: 0,
          padding: 0,
        },
      },
    },
    MuiDialogContent: {
      root: {
        backgroundColor: palette.background.default,
        padding: 30,
        scrollBehavior: "smooth",
        "&::-webkit-scrollbar": {
          height: shape.scrollSize,
          width: shape.scrollSize,
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: palette.secondary.main,
          borderRadius: shape.scrollRadius,
        },
      },
    },
    MuiDialogActions: {
      root: {
        alignItems: "right",
        padding: 15,
        backgroundColor: palette.background.default,
        borderTop: `1px solid ${palette.divider}`,
      },
    },
    MuiBackdrop: {
      root: {
        backgroundColor: palette.backdrop,
      },
    },
    MuiTooltip: {
      tooltip: {
        backgroundColor: "rgba(0,0,0,.8)",
      },
    },
    MuiButton: {
      root: {
        minHeight: 42,
      },
    },
    MuiSelect: {
      root: {
        minHeight: 54,
      },
    },
    MuiListItemIcon: {
      root: {
        opacity: 0.25,
        minWidth: 40,
      },
    },
    MuiLinearProgress: {
      root: {
        borderRadius: 1,
        height: 2,
      },
      bar: {
        borderRadius: 1,
      },
      indeterminate: {
        backgroundColor: palette.divider,
      },
      barColorPrimary: {
        backgroundColor: palette.text.primary,
      },
    },
    MuiTab: {
      root: {
        minWidth: 0,
        "@media (min-width: 0px)": {
          minWidth: 0,
        },
        textAlign: "center",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
      },
    },
    PrivateTabIndicator: {
      root: {
        height: 3,
        borderRadius: 1,
      },
    },
    MuiInputBase: {
      root: {
        minHeight: 54,
        lineHeight: font.lineHeight,
      },
    },
    MuiSlider: {
      valueLabel: {
        "& *": {
          backgroundColor: palette.secondary.main,
          color: "#fff",
        },
      },
    },
  },
});

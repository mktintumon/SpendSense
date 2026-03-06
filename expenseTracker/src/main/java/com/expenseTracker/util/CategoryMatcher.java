package com.expenseTracker.util;

import com.expenseTracker.model.VendorRule;
import java.util.List;

public class CategoryMatcher {

    /* FILE NOT USED NOW

    Instead of:
    Load all rules → loop in Java → match vendor

    We do:
    Ask DB → find rule where vendor LIKE keyword
    */

    public static String matchCategory(String vendor, List<VendorRule> rules) {
        for(VendorRule rule : rules){
            if(vendor.toLowerCase().contains(rule.getVendorKeyword().toLowerCase())){
                return rule.getCategory();
            }
        }

        return "Others";
    }
}

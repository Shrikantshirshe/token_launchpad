use soroban_sdk::{Env, String};

pub fn read_decimal(e: &Env) -> u32 {
    let key = soroban_sdk::symbol_short!("DECIMALS");
    e.storage().instance().get(&key).unwrap_or(7)
}

pub fn write_decimal(e: &Env, d: u32) {
    let key = soroban_sdk::symbol_short!("DECIMALS");
    e.storage().instance().set(&key, &d);
}

pub fn read_name(e: &Env) -> String {
    let key = soroban_sdk::symbol_short!("NAME");
    e.storage().instance().get(&key).unwrap()
}

pub fn write_name(e: &Env, n: String) {
    let key = soroban_sdk::symbol_short!("NAME");
    e.storage().instance().set(&key, &n);
}

pub fn read_symbol(e: &Env) -> String {
    let key = soroban_sdk::symbol_short!("SYMBOL");
    e.storage().instance().get(&key).unwrap()
}

pub fn write_symbol(e: &Env, s: String) {
    let key = soroban_sdk::symbol_short!("SYMBOL");
    e.storage().instance().set(&key, &s);
}

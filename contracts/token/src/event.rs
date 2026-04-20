use soroban_sdk::{Address, Env, Symbol};

pub fn mint(e: &Env, admin: Address, to: Address, amount: i128) {
    let topics = (Symbol::new(e, "mint"), admin, to);
    e.events().publish(topics, amount);
}

pub fn burn(e: &Env, from: Address, amount: i128) {
    let topics = (Symbol::new(e, "burn"), from);
    e.events().publish(topics, amount);
}

pub fn transfer(e: &Env, from: Address, to: Address, amount: i128) {
    let topics = (Symbol::new(e, "transfer"), from, to);
    e.events().publish(topics, amount);
}

pub fn approve(e: &Env, from: Address, spender: Address, amount: i128, expiration_ledger: u32) {
    let topics = (Symbol::new(e, "approve"), from, spender);
    e.events().publish(topics, (amount, expiration_ledger));
}

pub fn set_admin(e: &Env, admin: Address, new_admin: Address) {
    let topics = (Symbol::new(e, "set_admin"), admin);
    e.events().publish(topics, new_admin);
}

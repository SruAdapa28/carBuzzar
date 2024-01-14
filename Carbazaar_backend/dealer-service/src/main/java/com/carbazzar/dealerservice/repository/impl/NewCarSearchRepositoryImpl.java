package com.carbazzar.dealerservice.repository.impl;

import com.carbazzar.dealerservice.entity.NewCar;
import com.carbazzar.dealerservice.repository.NewCarSearchRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

@Repository
public class NewCarSearchRepositoryImpl implements NewCarSearchRepository {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<NewCar> findNewCarByCity(String city) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<NewCar> criteriaQuery = criteriaBuilder.createQuery(NewCar.class);

        Root<NewCar> variantRoot = criteriaQuery.from(NewCar.class);
        List<Predicate> predicates = new ArrayList<>();

        predicates.add(criteriaBuilder.equal(variantRoot.get("dealer").get("city"),city));

        criteriaQuery.where(predicates.toArray(new Predicate[0]));

        return entityManager.createQuery(criteriaQuery).getResultList();
    }

    @Override
    public List<NewCar> fetchDealerFacilities(String carName, String variantName, String city) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<NewCar> criteriaQuery = criteriaBuilder.createQuery(NewCar.class);

        Root<NewCar> variantRoot = criteriaQuery.from(NewCar.class);
        List<Predicate> predicates = new ArrayList<>();

        predicates.add(criteriaBuilder.equal(variantRoot.get("carName"),carName));
        predicates.add(criteriaBuilder.equal(variantRoot.get("variantName"),variantName));
        predicates.add(criteriaBuilder.equal(variantRoot.get("dealer").get("city"),city));

        criteriaQuery.where(predicates.toArray(new Predicate[0]));

        return entityManager.createQuery(criteriaQuery).getResultList();
    }
}

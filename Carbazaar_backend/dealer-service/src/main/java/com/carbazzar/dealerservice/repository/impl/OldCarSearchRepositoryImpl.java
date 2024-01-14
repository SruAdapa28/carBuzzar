package com.carbazzar.dealerservice.repository.impl;

import com.carbazzar.dealerservice.dto.SearchDto;
import com.carbazzar.dealerservice.entity.NewCar;
import com.carbazzar.dealerservice.entity.OldCar;
import com.carbazzar.dealerservice.enums.BodyType;
import com.carbazzar.dealerservice.enums.FuelType;
import com.carbazzar.dealerservice.enums.TransmissionType;
import com.carbazzar.dealerservice.repository.OldCarSearchRepository;
import org.apache.commons.lang3.StringUtils;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class OldCarSearchRepositoryImpl implements OldCarSearchRepository {
    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<OldCar> findOldCarsByCity(String city) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<OldCar> criteriaQuery = criteriaBuilder.createQuery(OldCar.class);

        Root<OldCar> variantRoot = criteriaQuery.from(OldCar.class);
        List<Predicate> predicates = new ArrayList<>();

        predicates.add(criteriaBuilder.equal(variantRoot.get("dealer").get("city"),city));

        criteriaQuery.where(predicates.toArray(new Predicate[0]));

        return entityManager.createQuery(criteriaQuery).getResultList();
    }

    @Override
    public List<OldCar> findSearchResults(SearchDto searchDto) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<OldCar> criteriaQuery = criteriaBuilder.createQuery(OldCar.class);

        Root<OldCar> variantRoot = criteriaQuery.from(OldCar.class);
        List<Predicate> predicates = new ArrayList<>();

        //min price filter
        if(searchDto.getMinPrice()>=0)
        {
            predicates.add(criteriaBuilder.greaterThanOrEqualTo(variantRoot.get("dealerPrice"), 0));
        }

        //max price filter
        if(searchDto.getMaxPrice()!=0)
        {
            predicates.add(criteriaBuilder.lessThanOrEqualTo(variantRoot.get("dealerPrice"), 2000000));
        }else{
            predicates.add(criteriaBuilder.lessThanOrEqualTo(variantRoot.get("dealerPrice"), 2000000));
        }

        //transmission type filter
        if(searchDto.getTransmissionType().size()==1)
        {
           // Expression<String> expression= variantRoot.get("transmissionType");

           // predicates.add(expression.in(searchDto.getTransmissionType()));
            List<TransmissionType> transmissionType = searchDto.getTransmissionType();
            predicates.add(criteriaBuilder.equal(variantRoot.get("transmissionType"), transmissionType.get(0)));
        }

        //FuelType filter
        if(searchDto.getFuelType().size()>0)
        {
            Expression<String> expression= variantRoot.get("fuelType");
            predicates.add(expression.in(searchDto.getFuelType()));
           // predicates.add(criteriaBuilder.equal(variantRoot.get("fuelType"), FuelType.valueOf(searchDto.getFuelType())));
        }

        //BodyType filter
        if(searchDto.getBodyType().size()>0)
        {
            Expression<String> expression= variantRoot.get("bodyType");
            predicates.add(expression.in(searchDto.getBodyType()));
            //predicates.add(criteriaBuilder.equal(variantRoot.get("bodyType"), BodyType.valueOf(searchDto.getBodyType())));
        }

        //Owner filter
        if(searchDto.getOwnerType().size()>0)
        {
            Expression<String> expression= variantRoot.get("ownerStatus");
            predicates.add(expression.in(searchDto.getOwnerType()));
            //predicates.add(criteriaBuilder.equal(variantRoot.get("ownerStatus"), searchDto.getOwnerType().trim()));
        }

        //Owner filter
        if(!StringUtils.isEmpty(searchDto.getCity()))
        {
            System.out.println("City :: "+searchDto.getCity());
            predicates.add(criteriaBuilder.equal(variantRoot.get("dealer").get("city"),searchDto.getCity()));
        }

        if(searchDto.getKilometersDriven()>0)
        {
            predicates.add(criteriaBuilder.lessThanOrEqualTo(variantRoot.get("kilometersDriven"), searchDto.getKilometersDriven()));
        }

        if(!StringUtils.isEmpty(searchDto.getBrandName()))
        {
            predicates.add(criteriaBuilder.equal(variantRoot.get("dealer").get("brand").get("name"),searchDto.getCarName()));
        }

        if(!StringUtils.isEmpty(searchDto.getCarName()))
        {
            predicates.add(criteriaBuilder.equal(variantRoot.get("carName"),searchDto.getCarName()));
        }

        criteriaQuery.where(predicates.toArray(new Predicate[0]));

        return entityManager.createQuery(criteriaQuery).getResultList();
    }
}
